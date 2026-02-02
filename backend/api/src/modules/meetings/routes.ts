import express, { Router } from "express";
import { prisma } from "@notemind/db";
import { authenticateToken, AuthRequest } from "../../middleware/auth";

const router: Router = express.Router();

// GET /meetings - List user's meetings
router.get("/", authenticateToken, async (req: AuthRequest, res) => {
    try {
        const meetings = await prisma.meeting.findMany({
            where: { userId: req.userId },
            include: {
                transcript: { select: { id: true } },
                summary: { select: { id: true } }
            },
            orderBy: { startTime: "desc" }
        });

        res.json({ meetings });
    } catch (error) {
        console.error("List Meetings Error:", error);
        res.status(500).json({ error: "Failed to fetch meetings" });
    }
});

// POST /meetings - Create a new meeting (add notetaker to GMeet)
router.post("/", authenticateToken, async (req: AuthRequest, res) => {
    const { meetingUrl, title } = req.body;

    if (!meetingUrl) {
        return res.status(400).json({ error: "Meeting URL is required" });
    }

    // Validate Google Meet URL format
    const gmeetRegex = /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/i;
    if (!gmeetRegex.test(meetingUrl)) {
        return res.status(400).json({ error: "Invalid Google Meet URL format" });
    }

    try {
        const meeting = await prisma.meeting.create({
            data: {
                userId: req.userId!,
                joinUrl: meetingUrl,
                title: title || "Untitled Meeting",
                startTime: new Date(),
                status: "SCHEDULED"
            }
        });

        res.json({
            meeting,
            message: "Notetaker will join when admitted to the meeting"
        });
    } catch (error) {
        console.error("Create Meeting Error:", error);
        res.status(500).json({ error: "Failed to create meeting" });
    }
});

// GET /meetings/:id - Get meeting details with transcript and summary
router.get("/:id", authenticateToken, async (req: AuthRequest, res) => {
    const { id } = req.params;

    try {
        const meeting = await prisma.meeting.findFirst({
            where: {
                id,
                userId: req.userId
            },
            include: {
                transcript: true,
                summary: true
            }
        });

        if (!meeting) {
            return res.status(404).json({ error: "Meeting not found" });
        }

        res.json({ meeting });
    } catch (error) {
        console.error("Get Meeting Error:", error);
        res.status(500).json({ error: "Failed to fetch meeting" });
    }
});

export default router;
