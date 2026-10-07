import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import { connectDB } from './src/config/db.js';
import { User } from './src/models/User.js';

const PORT = process.env.PORT || 5000;

// Seed initial Admin user for local development
const seedAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@deskdrop.com' });
    if (!adminExists) {
      await User.create({
        name: 'DeskDrop Admin',
        email: 'admin@deskdrop.com',
        password: 'admin123',
        role: 'ADMIN',
      });
      console.log('Admin seed account created: admin@deskdrop.com / admin123');
    }
  } catch (err) {
    console.error('Admin seed error:', err.message);
  }
};

const startServer = async () => {
  try {
    // 1. Connect to MongoDB first
    await connectDB();
    console.log('MongoDB connected');

    // Seed default admin user
    await seedAdminUser();

    // 2. Start Express server after DB connection
    app.listen(PORT, () => {
      console.log(`DeskDrop API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server due to MongoDB connection failure:', error.message);
    app.listen(PORT, () => {
      console.log(`DeskDrop API running in fallback mode on http://localhost:${PORT}`);
    });
  }
};

startServer();
