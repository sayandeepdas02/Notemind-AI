import express from "express";
import cors from "cors";
import { Queue } from "bullmq";
import { connectDB } from "@notemind/db";

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB(process.env.DATABASE_URL || "mongodb://localhost:27017/notemind");

// Initialize BullMQ Queue
const meetingQueue = new Queue("meeting-jobs", {
    connection: {
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT || "6379"),
    },
});

app.use(cors());
app.use(express.json());

import authRoutes from "./modules/auth/routes";
import calendarRoutes from "./modules/calendar/routes";
import meetingsRoutes from "./modules/meetings/routes";

app.use("/auth", authRoutes);
app.use("/calendar", calendarRoutes);
app.use("/meetings", meetingsRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Notemind API is running" });
});

// Endpoint to trigger a meeting join (Simulated for QA)
app.post("/meetings/join", async (req, res) => {
    const { meetingUrl, scheduledTime } = req.body;

    if (!meetingUrl) {
        return res.status(400).json({ error: "meetingUrl is required" });
    }

    try {
        // 1. Create Meeting in DB (Simulated User ID for MVP)
        const { User } = require("@notemind/db"); // Dynamic import to avoid circular dependency issues if any
        let user = await User.findOne();
        if (!user) {
            // Create dummy user if none exists for testing
            user = await User.create({
                email: "test@example.com", name: "Test User"
            });
        }

        // 2. Add Job to Queue
        const job = await meetingQueue.add("join-meeting", {
            meetingUrl,
            scheduledTime: scheduledTime || new Date().toISOString(),
        });

        console.log(`[API] Scheduled Job ${job.id} for ${meetingUrl}`);

        res.json({ message: "Meeting scheduled", jobId: job.id });
    } catch (error: any) {
        console.error("[API] Error scheduling meeting:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});
