import express, { Router } from "express";
import { oauth2Client, SCOPES } from "../../config/auth";
import { prisma } from "@notemind/db";
import { google } from "googleapis";

const router: Router = express.Router();

// GET /auth/google
// Redirects user to Google Consent Screen
router.get("/google", (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline", // Required to get refresh_token
        scope: SCOPES,
        prompt: "consent" // Force consent to ensure we get a refresh token
    });
    res.redirect(authUrl);
});

// GET /auth/google/callback
// Exchanges code for tokens and creates/updates user
router.get("/google/callback", async (req, res) => {
    const { code } = req.query;

    if (!code || typeof code !== 'string') {
        return res.status(400).send("Missing code parameter");
    }

    try {
        // Exchange code for tokens
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // Get User Info
        const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
        const userInfo = await oauth2.userinfo.get();

        const email = userInfo.data.email;
        const name = userInfo.data.name;

        if (!email) {
            return res.status(400).send("No email found in Google Profile");
        }

        // Upsert User in DB
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                googleRefreshToken: tokens.refresh_token || undefined, // Only update if we go a new one
                name: name || undefined
            },
            create: {
                email,
                name: name || "Unknown User",
                googleRefreshToken: tokens.refresh_token
            }
        });

        // In a real app, set a secure HTTP-only session cookie here.
        // For MVP, we'll just redirect to dashboard with a query param (Not Secure, but simple)
        // OR better: Return a simple success page or JSON

        // Let's redirect to frontend Dashboard
        res.redirect(`http://localhost:3000/dashboard?userId=${user.id}`);

    } catch (error) {
        console.error("Auth Error:", error);
        res.status(500).send("Authentication Failed");
    }
});

export default router;
