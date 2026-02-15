import express, { Router } from "express";
import { User, Meeting } from "@notemind/db";
import { oauth2Client } from "../../config/auth";
import { google } from "googleapis";

const router: Router = express.Router();

// POST /calendar/sync
// Body: { userId: string } (In real app, get from session)
router.post("/sync", async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "Missing userId" });
    }

    try {
        const user = await User.findById(userId);
        if (!user || !user.googleRefreshToken) {
            return res.status(401).json({ error: "User not connected to Google Calendar" });
        }

        // Set Refresh Token
        oauth2Client.setCredentials({ refresh_token: user.googleRefreshToken });

        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        // List events for next 7 days
        const now = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(now.getDate() + 7);

        const response = await calendar.events.list({
            calendarId: "primary",
            timeMin: now.toISOString(),
            timeMax: nextWeek.toISOString(),
            singleEvents: true,
            orderBy: "startTime",
        });

        const events = response.data.items || [];
        const syncedMeetings = [];

        for (const event of events) {
            // Check if it's a GMeet
            const joinUrl = event.hangoutLink; // Or parsing location/description

            if (joinUrl && joinUrl.includes("meet.google.com")) {
                const startTime = event.start?.dateTime ? new Date(event.start.dateTime) : null;
                const endTime = event.end?.dateTime ? new Date(event.end.dateTime) : null;

                if (startTime) {
                    // Upsert Meeting
                    const meeting = await Meeting.findOneAndUpdate(
                        { googleEventId: event.id! },
                        {
                            userId: user.id,
                            googleEventId: event.id!,
                            title: event.summary || "Untitled Meeting",
                            startTime,
                            endTime,
                            joinUrl,
                            // status: "SCHEDULED" // Don't overwrite status if it exists
                        },
                        { new: true, upsert: true, setDefaultsOnInsert: true }
                    );
                    syncedMeetings.push(meeting);
                }
            }
        }

        res.json({ message: "Sync complete", count: syncedMeetings.length, meetings: syncedMeetings });

    } catch (error: any) {
        console.error("Calendar Sync Error:", error);
        // If refresh token invalid, might need to nullify it in DB
        res.status(500).json({ error: error.message || "Failed to sync calendar" });
    }
});

export default router;
