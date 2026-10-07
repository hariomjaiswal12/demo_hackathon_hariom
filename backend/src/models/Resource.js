import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Resource name is required'],
      trim: true,
    },
    resourceCode: {
      type: String,
      required: [true, 'Resource code is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['SPACE', 'AUDIO', 'TESTING_HARDWARE', 'DISPLAY'],
      default: 'AUDIO',
    },
    status: {
      type: String,
      enum: ['AVAILABLE', 'IN_USE', 'MAINTENANCE'],
      default: 'AVAILABLE',
    },
    location: {
      type: String,
      required: [true, 'Location placement is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    specifications: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    image: {
      type: String,
      default: '',
    },
    requiresBadgeSignout: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Resource = mongoose.model('Resource', resourceSchema);
