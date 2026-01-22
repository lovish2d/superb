/**
 * User Model for Platform Service
 * Supports both platform_owner and customer user types
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
  userType: {
    type: String,
    enum: ['platform_owner', 'customer'],
    required: true,
    default: 'platform_owner',
    index: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    index: true,
    // organizationId is optional for platform_owner users
    validate: {
      validator: function(value) {
        // If userType is customer, organizationId is required
        if (this.userType === 'customer') {
          return value != null;
        }
        return true;
      },
      message: 'Organization ID is required for customer users',
    },
  },
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
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

// Compound indexes for multi-tenancy queries (only for customer users)
userSchema.index({ userType: 1, organizationId: 1, email: 1 });
userSchema.index({ userType: 1, organizationId: 1, isActive: 1 });
userSchema.index({ userType: 1, isActive: 1 });

export default mongoose.model('User', userSchema);

