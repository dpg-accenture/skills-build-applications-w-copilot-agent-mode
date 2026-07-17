import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ava Chen', email: 'ava@example.com', role: 'captain' },
      { name: 'Leo Martinez', email: 'leo@example.com', role: 'member' },
      { name: 'Nia Brooks', email: 'nia@example.com', role: 'member' },
    ]);

    await Team.insertMany([
      { name: 'Momentum', description: 'Early morning runners', members: 4 },
      { name: 'Velocity', description: 'Strength and conditioning crew', members: 3 },
    ]);

    await Activity.insertMany([
      { type: 'run', duration: 30, date: new Date('2026-07-15') },
      { type: 'strength', duration: 45, date: new Date('2026-07-16') },
      { type: 'yoga', duration: 25, date: new Date('2026-07-17') },
    ]);

    await LeaderboardEntry.insertMany([
      { name: users[0].name, points: 1200, rank: 1 },
      { name: users[1].name, points: 980, rank: 2 },
      { name: users[2].name, points: 870, rank: 3 },
    ]);

    await Workout.insertMany([
      { title: 'Cardio Blast', difficulty: 'moderate', duration: 35 },
      { title: 'Core Builder', difficulty: 'easy', duration: 20 },
      { title: 'Power Circuit', difficulty: 'hard', duration: 45 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
