import { Worker } from "bullmq";
import { Meeting, connectDB } from "@notemind/db";
import IORedis from "ioredis";

console.log("Bot Service Starting...");

// Connect to MongoDB
connectDB(process.env.DATABASE_URL || "mongodb://localhost:27017/notemind");

const connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", {
    maxRetriesPerRequest: null,
});

const worker = new Worker(
    "meeting-jobs",
    async (job) => {
        console.log(`[Bot] Processing job ${job.id}: ${job.name}`);
        const { meetingId, meetLink } = job.data;

        try {
            // 1. Update status to RUNNING
            await Meeting.findByIdAndUpdate(meetingId, { status: "RUNNING" });
            console.log(`[Bot] Meeting ${meetingId} status -> RUNNING`);

            // 2. Simulate Bot Work
            console.log(`[Bot] Joining ${meetLink}...`);
            await new Promise((resolve) => setTimeout(resolve, 5000)); // 5s mock delay

            const mockTranscript = `
Speaker 1: Welcome everyone to the weekly sync.
Speaker 2: Thanks! I have updates on the frontend.
Speaker 1: Great, let's hear them.
Speaker 2: The dashboard is now responsive and connects to the API.
Speaker 1: Awesome work. Meeting adjourned.
            `.trim();

            const mockSummary = "The team discussed the frontend progress. The dashboard is now responsive and API integrated.";

            // 3. Save Results & Complete
            await Meeting.findByIdAndUpdate(meetingId, {
                status: "COMPLETED",
                transcript: mockTranscript,
                summary: mockSummary
            });
            console.log(`[Bot] Meeting ${meetingId} status -> COMPLETED`);

            return { status: "SUCCESS" };

        } catch (error: any) {
            console.error(`[Bot] Job failed for meeting ${meetingId}`, error);

            await Meeting.findByIdAndUpdate(meetingId, { status: "FAILED" });

            throw error;
        }
    },
    { connection }
);

worker.on("completed", (job) => {
    console.log(`[Bot] Job ${job.id} completed successfully!`);
});

worker.on("failed", (job, err) => {
    console.log(`[Bot] Job ${job?.id} failed with ${err.message}`);
});
