import { Worker } from "bullmq";
import { chromium } from "playwright";

console.log("Bot Service Starting...");

const worker = new Worker(
    "meeting-jobs",
    async (job) => {
        console.log(`[Bot] Processing job ${job.id}: ${job.name}`);
        const { meetingUrl } = job.data;

        try {
            console.log(`[Bot] Launching Browser for ${meetingUrl}...`);

            const browser = await chromium.launch({
                headless: true,
                args: ["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"] // Mock permissions
            });
            const context = await browser.newContext({ permissions: ["microphone"] });
            const page = await context.newPage();

            console.log(`[Bot] Navigating to ${meetingUrl}...`);
            await page.goto(meetingUrl);

            // Simulate "Working"
            console.log("[Bot] In Lobby, waiting...");
            await new Promise((resolve) => setTimeout(resolve, 5000)); // Fake 5s wait

            console.log("[Bot] Meeting Simulation Complete.");
            await browser.close();

            return { status: "SUCCESS", recordingUrl: "s3://mock-bucket/audio.webm" };
        } catch (error) {
            console.error(`[Bot] Failed to join ${meetingUrl}`, error);
            throw error;
        }
    },
    {
        connection: {
            host: process.env.REDIS_HOST || "localhost",
            port: parseInt(process.env.REDIS_PORT || "6379"),
        },
    }
);

worker.on("completed", (job) => {
    console.log(`[Bot] Job ${job.id} completed successfully!`);
});

worker.on("failed", (job, err) => {
    console.log(`[Bot] Job ${job?.id} failed with ${err.message}`);
});
