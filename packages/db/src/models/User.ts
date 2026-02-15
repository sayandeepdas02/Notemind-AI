import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password?: string;
    name?: string;
    googleRefreshToken?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String },
    googleRefreshToken: { type: String },
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', UserSchema);
