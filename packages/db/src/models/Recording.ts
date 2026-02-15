import mongoose, { Schema, Document } from 'mongoose';

export interface IRecording extends Document {
    meetingId: string;
    s3Key: string;
    durationSec?: number;
    createdAt: Date;
}

const RecordingSchema: Schema = new Schema({
    meetingId: { type: Schema.Types.ObjectId, ref: 'Meeting', required: true, unique: true },
    s3Key: { type: String, required: true },
    durationSec: { type: Number },
    createdAt: { type: Date, default: Date.now },
});

export const Recording = mongoose.model<IRecording>('Recording', RecordingSchema);
