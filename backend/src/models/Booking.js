import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource',
      required: [true, 'Resource reference is required'],
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required'],
    },
    purpose: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'AUTO_RELEASED'],
      default: 'CONFIRMED',
    },
    checkInAt: {
      type: Date,
      default: null,
    },
    passcode: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Compound Index for efficient overlap & availability querying
bookingSchema.index({ resource: 1, startTime: 1, endTime: 1, status: 1 });

export const Booking = mongoose.model('Booking', bookingSchema);
