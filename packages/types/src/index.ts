import { z } from "zod";

export const MeetingSchema = z.object({
    title: z.string(),
    startTime: z.string().datetime(),
    joinUrl: z.string().url()
});

export type CreateMeetingInput = z.infer<typeof MeetingSchema>;
