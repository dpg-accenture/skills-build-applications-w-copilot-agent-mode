import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  type: string;
  duration: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
