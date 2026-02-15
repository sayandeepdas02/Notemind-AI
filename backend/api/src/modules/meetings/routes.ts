import express, { Router } from "express";
import { Meeting } from "@notemind/db";
import { authenticateToken, AuthRequest } from "../../middleware/auth";
import { meetingQueue } from "../../transcription/queue";

const router: Router = express.Router();

// GET /meetings - List user's meetings
router.get("/", authenticateToken, async (req: AuthRequest, res) => {
    try {
        const meetings = await Meeting.find({ userId: req.userId }).sort({ startTime: -1 });

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
        const meeting = await Meeting.create({
            userId: req.userId!,
            joinUrl: meetingUrl,
            title: title || "Untitled Meeting",
            startTime: new Date(),
            status: "PENDING" // Initial status
        });

        // Add to queue
        await meetingQueue.add("join-meeting", {
            meetingId: meeting.id,
            meetLink: meetingUrl
        });

        res.json({
            meeting,
            message: "Notetaker scheduled to join"
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
        const meeting = await Meeting.findOne({
            _id: id,
            userId: req.userId
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
