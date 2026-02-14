import express, { Router } from "express";
import { prisma } from "@notemind/db";
import bcrypt from "bcryptjs";
import { authenticateToken, generateToken, AuthRequest } from "../../middleware/auth";
import { oauth2Client, SCOPES } from "../../config/auth";
import { google } from "googleapis";

const router: Router = express.Router();

// GET /auth/google
router.get("/google", (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline", // Required for refresh_token
        scope: SCOPES,
        prompt: "consent" // Force to get refresh_token
    });
    res.redirect(authUrl);
});

// GET /auth/google/callback
router.get("/google/callback", async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: "Missing code" });
    }

    try {
        const { tokens } = await oauth2Client.getToken(code as string);
        oauth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
        const userInfo = await oauth2.userinfo.get();

        if (!userInfo.data.email) {
            return res.status(400).json({ error: "Google account has no email" });
        }

        const email = userInfo.data.email;
        const name = userInfo.data.name || "User";
        const googleRefreshToken = tokens.refresh_token;

        // Find or Create User
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            // Create user
            user = await prisma.user.create({
                data: {
                    email,
                    name,
                    googleRefreshToken // Store refresh token
                }
            });
        } else if (googleRefreshToken) {
            // Update refresh token if we got a new one
            user = await prisma.user.update({
                where: { id: user.id },
                data: { googleRefreshToken }
            });
        }

        // Generate JWT
        const token = generateToken(user.id, user.email);

        // Redirect to frontend with token
        // In a real app, uses a secure cookie or a temporary code.
        // For MVP, passing via query param to specific frontend route.
        // Assuming frontend is http://localhost:3000
        res.redirect(`http://localhost:3000/login?token=${token}`);

    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(500).json({ error: "Authentication failed" });
    }
});

// POST /auth/signup
router.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name || "User",
            },
        });

        const token = generateToken(user.id, user.email);
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Failed to create account" });
    }
});

// POST /auth/signin
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = generateToken(user.id, user.email);
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        console.error("Signin Error:", error);
        res.status(500).json({ error: "Failed to sign in" });
    }
});

// GET /auth/me - Get current user
router.get("/me", authenticateToken, async (req: AuthRequest, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: { id: true, email: true, name: true, createdAt: true }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ user });
    } catch (error) {
        console.error("Get User Error:", error);
        res.status(500).json({ error: "Failed to get user" });
    }
});

// PUT /auth/password - Change password
router.put("/password", authenticateToken, async (req: AuthRequest, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: "Current and new passwords are required" });
    }

    if (newPassword.length < 6) {
        return res.status(400).json({ error: "New password must be at least 6 characters" });
    }

    try {
        const user = await prisma.user.findUnique({ where: { id: req.userId } });
        if (!user || !user.password) {
            return res.status(404).json({ error: "User not found" });
        }

        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Current password is incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: req.userId },
            data: { password: hashedPassword }
        });

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Password Change Error:", error);
        res.status(500).json({ error: "Failed to change password" });
    }
});

export default router;
