"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            user_1.User.deleteMany({}),
            team_1.Team.deleteMany({}),
            activity_1.Activity.deleteMany({}),
            leaderboard_1.LeaderboardEntry.deleteMany({}),
            workout_1.Workout.deleteMany({}),
        ]);
        const users = await user_1.User.insertMany([
            { name: 'Ava Chen', email: 'ava@example.com', role: 'captain' },
            { name: 'Leo Martinez', email: 'leo@example.com', role: 'member' },
            { name: 'Nia Brooks', email: 'nia@example.com', role: 'member' },
        ]);
        await team_1.Team.insertMany([
            { name: 'Momentum', description: 'Early morning runners', members: 4 },
            { name: 'Velocity', description: 'Strength and conditioning crew', members: 3 },
        ]);
        await activity_1.Activity.insertMany([
            { type: 'run', duration: 30, date: new Date('2026-07-15') },
            { type: 'strength', duration: 45, date: new Date('2026-07-16') },
            { type: 'yoga', duration: 25, date: new Date('2026-07-17') },
        ]);
        await leaderboard_1.LeaderboardEntry.insertMany([
            { name: users[0].name, points: 1200, rank: 1 },
            { name: users[1].name, points: 980, rank: 2 },
            { name: users[2].name, points: 870, rank: 3 },
        ]);
        await workout_1.Workout.insertMany([
            { title: 'Cardio Blast', difficulty: 'moderate', duration: 35 },
            { title: 'Core Builder', difficulty: 'easy', duration: 20 },
            { title: 'Power Circuit', difficulty: 'hard', duration: 45 },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
