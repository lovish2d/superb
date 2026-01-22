/**
 * Organization Model
 */
import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  type: {
    type: String,
    enum: ['logistics', 'maintainer', 'customer', 'resource_provider'],
    default: 'customer',
    required: true,
    index: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
    uppercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },
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
  settings: {
    timezone: { type: String, default: 'UTC' },
    currency: { type: String, default: 'USD' },
    language: { type: String, default: 'en' },
  },
  onboardedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  onboardedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Indexes for efficient queries
organizationSchema.index({ type: 1, isActive: 1 });
// Note: code index is automatically created by unique: true

export default mongoose.model('Organization', organizationSchema);

