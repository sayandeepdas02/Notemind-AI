import mongoose, { Schema, Document } from 'mongoose';

export interface IMeeting extends Document {
    userId: string;
    googleEventId?: string;
    joinUrl: string;
    title: string;
    startTime: Date;
    endTime?: Date;
    status: string;
    transcript?: string;
    summary?: string;
    createdAt: Date;
    updatedAt: Date;
}

const MeetingSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    googleEventId: { type: String },
    joinUrl: { type: String, required: true },
    title: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    status: { type: String, default: 'SCHEDULED' },
    transcript: { type: String },
    summary: { type: String },
}, { timestamps: true });

export const Meeting = mongoose.model<IMeeting>('Meeting', MeetingSchema);
