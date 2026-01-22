/**
 * User Model for User Service
 */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
    index: true,
  },
  roles: [{
    type: String,
    enum: ['super_admin', 'admin', 'org_admin', 'manager', 'operator', 'viewer'],
    required: true,
  }],
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {},
  },
  preferences: {
    timezone: { type: String, default: 'UTC' },
    language: { type: String, default: 'en' },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: false },
    },
  },
}, {
  timestamps: true,
});

// Compound index for multi-tenancy queries
userSchema.index({ organizationId: 1, email: 1 });
userSchema.index({ organizationId: 1, isActive: 1 });

export default mongoose.model('User', userSchema);

