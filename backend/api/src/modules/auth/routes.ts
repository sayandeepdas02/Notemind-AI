import express, { Router } from "express";
import { prisma } from "@notemind/db";
import bcrypt from "bcryptjs";
import { authenticateToken, generateToken, AuthRequest } from "../../middleware/auth";

const router: Router = express.Router();

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
