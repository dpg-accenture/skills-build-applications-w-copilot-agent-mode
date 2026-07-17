import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  members: number;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  members: { type: Number, required: true, default: 0 },
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);
