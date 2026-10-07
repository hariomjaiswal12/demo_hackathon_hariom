import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { User } from '../models/User.js';
import { Resource } from '../models/Resource.js';
import { Booking } from '../models/Booking.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/deskdrop';

const seedData = async () => {
  try {
    console.log(' Connecting to MongoDB:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log(' Connected to MongoDB.');

    // 1. DEMO USERS
    const passwordHashUser = await bcrypt.hash('password123', 10);
    const passwordHashAdmin = await bcrypt.hash('admin123', 10);

    const usersData = [
      {
        name: 'Admin DeskDrop',
        email: 'admin@deskdrop.com',
        password: passwordHashAdmin,
        role: 'ADMIN',
      },
      {
        name: 'Sarah Jenkins',
        email: 'user@deskdrop.com',
        password: passwordHashUser,
        role: 'USER',
      },
      {
        name: 'Rahul Sharma',
        email: 'rahul@deskdrop.com',
        password: passwordHashUser,
        role: 'USER',
      },
      {
        name: 'Priya Verma',
        email: 'priya@deskdrop.com',
        password: passwordHashUser,
        role: 'USER',
      },
    ];

    const userMap = {};
    for (const u of usersData) {
      const updatedUser = await User.findOneAndUpdate(
        { email: u.email },
        { $set: u },
        { upsert: true, new: true, runValidators: true }
      );
      userMap[u.email] = updatedUser;
    }
    console.log(` Seeded ${Object.keys(userMap).length} users.`);

    // 2. DEMO RESOURCES
    const resourcesData = [
      {
        name: 'Conference Room Alpha',
        resourceCode: 'ROOM-ALPHA',
        category: 'SPACE',
        status: 'AVAILABLE',
        location: '1st Floor',
        description: 'Modern conference room for team meetings, presentations and client calls.',
        specifications: [
          { label: 'Capacity', value: '10 people' },
          { label: 'Display', value: '65-inch 4K' },
          { label: 'Whiteboard', value: 'Yes' },
          { label: 'Video Conferencing', value: 'Yes' },
        ],
        image: '/resources/conference-room.jpg',
      },
      {
        name: 'Meeting Room Beta',
        resourceCode: 'ROOM-BETA',
        category: 'SPACE',
        status: 'AVAILABLE',
        location: '2nd Floor',
        description: 'Collaborative meeting room for small teams.',
        specifications: [
          { label: 'Capacity', value: '6 people' },
          { label: 'Display', value: '55-inch' },
          { label: 'Whiteboard', value: 'Yes' },
        ],
        image: '/resources/meeting-room.jpg',
      },
      {
        name: 'Podcast Studio',
        resourceCode: 'AUDIO-STUDIO-01',
        category: 'AUDIO',
        status: 'AVAILABLE',
        location: 'Media Lab',
        description: 'Professional audio recording space for podcasts and interviews.',
        specifications: [
          { label: 'Microphones', value: '4' },
          { label: 'Audio Interface', value: 'Yes' },
          { label: 'Acoustic Treatment', value: 'Yes' },
        ],
        image: '/resources/podcast-studio.jpg',
      },
      {
        name: 'Rode Wireless GO II',
        resourceCode: 'MIC-001',
        category: 'AUDIO',
        status: 'AVAILABLE',
        location: 'Audio Room',
        description: 'Ultra-compact dual-channel wireless microphone system.',
        specifications: [
          { label: 'Type', value: 'Wireless' },
          { label: 'Channels', value: '2' },
          { label: 'Range', value: '200m' },
        ],
        image: '/resources/wireless-mic.jpg',
      },
      {
        name: 'Shure SM7B',
        resourceCode: 'MIC-002',
        category: 'AUDIO',
        status: 'IN_USE',
        location: 'Recording Studio',
        description: 'Cardioid dynamic microphone for vocal broadcast and recording.',
        specifications: [
          { label: 'Type', value: 'Dynamic' },
          { label: 'Connectivity', value: 'XLR' },
        ],
        image: '/resources/microphone.jpg',
      },
      {
        name: 'Sony FX3 Cinema Camera',
        resourceCode: 'CAM-001',
        category: 'TESTING_HARDWARE',
        status: 'AVAILABLE',
        location: 'Studio Booth C',
        description: 'Full-frame cinema line camera with 4K recording.',
        specifications: [
          { label: 'Resolution', value: '4K' },
          { label: 'Lens', value: '24-70mm' },
          { label: 'Storage', value: 'CFexpress' },
        ],
        image: '/resources/sony-fx3.jpg',
      },
      {
        name: 'VR Testing Kit',
        resourceCode: 'VR-001',
        category: 'TESTING_HARDWARE',
        status: 'AVAILABLE',
        location: 'Hardware Lab',
        description: 'Complete VR headset kit for spatial app development and testing.',
        specifications: [
          { label: 'Headset', value: 'Meta Quest' },
          { label: 'Controllers', value: '2' },
          { label: 'Tracking', value: '6DoF' },
        ],
        image: '/resources/vr-kit.jpg',
      },
      {
        name: 'MacBook Pro 14',
        resourceCode: 'LAPTOP-001',
        category: 'TESTING_HARDWARE',
        status: 'AVAILABLE',
        location: 'IT Lab',
        description: 'High-performance laptop workstation for developer testing.',
        specifications: [
          { label: 'Processor', value: 'Apple M3 Pro' },
          { label: 'Memory', value: '18GB' },
          { label: 'Storage', value: '512GB SSD' },
        ],
        image: '/resources/macbook.jpg',
      },
      {
        name: 'Dell UltraSharp 32',
        resourceCode: 'DISPLAY-001',
        category: 'DISPLAY',
        status: 'AVAILABLE',
        location: 'Design Lab',
        description: '32-inch 4K USB-C monitor with premier color calibration.',
        specifications: [
          { label: 'Size', value: '32 inch' },
          { label: 'Resolution', value: '4K' },
          { label: 'Panel', value: 'IPS' },
        ],
        image: '/resources/dell-monitor.jpg',
      },
      {
        name: 'Samsung 55 Display',
        resourceCode: 'DISPLAY-002',
        category: 'DISPLAY',
        status: 'MAINTENANCE',
        location: 'Conference Area',
        description: 'Commercial wall display undergoing firmware maintenance.',
        specifications: [
          { label: 'Size', value: '55 inch' },
          { label: 'Resolution', value: '4K' },
        ],
        image: '/resources/samsung-display.jpg',
      },
      {
        name: 'Product Testing Bench',
        resourceCode: 'TEST-001',
        category: 'TESTING_HARDWARE',
        status: 'AVAILABLE',
        location: 'Testing Lab',
        description: 'Multi-workstation hardware testing bench.',
        specifications: [
          { label: 'Power', value: '230V' },
          { label: 'Network', value: 'Gigabit Ethernet' },
          { label: 'Workstations', value: '4' },
        ],
        image: '/resources/testing-bench.jpg',
      },
      {
        name: 'Training Room',
        resourceCode: 'ROOM-TRAIN',
        category: 'SPACE',
        status: 'AVAILABLE',
        location: '3rd Floor',
        description: 'Spacious training space for workshops, seminars, and team onboarding.',
        specifications: [
          { label: 'Capacity', value: '20 people' },
          { label: 'Projector', value: 'Yes' },
          { label: 'Whiteboard', value: 'Yes' },
          { label: 'Video Conferencing', value: 'Yes' },
        ],
        image: '/resources/training-room.jpg',
      },
    ];

    const resourceMap = {};
    for (const r of resourcesData) {
      const updatedResource = await Resource.findOneAndUpdate(
        { resourceCode: r.resourceCode },
        { $set: r },
        { upsert: true, new: true, runValidators: true }
      );
      resourceMap[r.resourceCode] = updatedResource;
    }
    console.log(` Seeded ${Object.keys(resourceMap).length} resources.`);

    // 3. DEMO BOOKINGS
    // Clear previous seeded demo bookings to ensure clean idempotency
    const allDemoUserIds = Object.values(userMap).map((u) => u._id);
    await Booking.deleteMany({ user: { $in: allDemoUserIds } });

    const now = new Date();

    // Helper for date offsets
    const hoursFromNow = (h) => new Date(now.getTime() + h * 60 * 60 * 1000);

    const bookingsData = [
      // 1 ACTIVE Booking
      {
        user: userMap['rahul@deskdrop.com']._id,
        resource: resourceMap['MIC-002']._id, // Shure SM7B (IN_USE)
        startTime: hoursFromNow(-1.5),
        endTime: hoursFromNow(2.5),
        purpose: 'Podcast Audio Recording',
        status: 'ACTIVE',
        checkInAt: hoursFromNow(-1.2),
        passcode: '8024-911',
      },
      // 3 CONFIRMED (Upcoming) Bookings
      {
        user: userMap['user@deskdrop.com']._id,
        resource: resourceMap['ROOM-ALPHA']._id, // Conference Room Alpha
        startTime: hoursFromNow(0.5),
        endTime: hoursFromNow(2),
        purpose: 'Sprint Planning',
        status: 'CONFIRMED',
        passcode: '4012-789',
      },
      {
        user: userMap['rahul@deskdrop.com']._id,
        resource: resourceMap['CAM-001']._id, // Sony FX3 Camera
        startTime: hoursFromNow(21),
        endTime: hoursFromNow(23),
        purpose: 'Product Demo Recording',
        status: 'CONFIRMED',
        passcode: '1204-567',
      },
      {
        user: userMap['priya@deskdrop.com']._id,
        resource: resourceMap['ROOM-TRAIN']._id, // Training Room
        startTime: hoursFromNow(18),
        endTime: hoursFromNow(20),
        purpose: 'Frontend Workshop',
        status: 'CONFIRMED',
        passcode: '9931-102',
      },
      // 2 COMPLETED Bookings
      {
        user: userMap['user@deskdrop.com']._id,
        resource: resourceMap['ROOM-BETA']._id, // Meeting Room Beta
        startTime: hoursFromNow(-28),
        endTime: hoursFromNow(-26.5),
        purpose: 'Design System Review',
        status: 'COMPLETED',
        checkInAt: hoursFromNow(-27.9),
        passcode: '3310-449',
      },
      {
        user: userMap['rahul@deskdrop.com']._id,
        resource: resourceMap['LAPTOP-001']._id, // MacBook Pro 14
        startTime: hoursFromNow(-24),
        endTime: hoursFromNow(-21),
        purpose: 'Benchmark Performance Testing',
        status: 'COMPLETED',
        checkInAt: hoursFromNow(-23.95),
        passcode: '6109-872',
      },
      // 2 CANCELLED Bookings
      {
        user: userMap['priya@deskdrop.com']._id,
        resource: resourceMap['ROOM-BETA']._id,
        startTime: hoursFromNow(-23),
        endTime: hoursFromNow(-22),
        purpose: 'Client Pre-sync',
        status: 'CANCELLED',
        passcode: '7401-229',
      },
      {
        user: userMap['user@deskdrop.com']._id,
        resource: resourceMap['VR-001']._id,
        startTime: hoursFromNow(-50),
        endTime: hoursFromNow(-49),
        purpose: 'Spatial UX Trial',
        status: 'CANCELLED',
        passcode: '5180-334',
      },
    ];

    const seededBookings = await Booking.insertMany(bookingsData);
    console.log(` Seeded ${seededBookings.length} demo bookings.`);

    console.log(' SEED COMPLETED SUCCESSFULLY!');
    process.exit(0);
  } catch (err) {
    console.error(' Seed failed with error:', err);
    process.exit(1);
  }
};

seedData();
