/**
 * Resource Model
 */
import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['aircraft', 'equipment', 'facility', 'personnel', 'other'],
    index: true,
  },
  providerOrganizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: ['available', 'in_use', 'maintenance', 'reserved', 'unavailable'],
    default: 'available',
    index: true,
  },
  capacity: {
    type: Number,
    default: 1,
  },
  currentUsage: {
    type: Number,
    default: 0,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    address: String,
    city: String,
    country: String,
  },
  specifications: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {},
  },
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {},
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },
}, {
  timestamps: true,
});

// Geospatial index for location-based queries
resourceSchema.index({ location: '2dsphere' });
resourceSchema.index({ providerOrganizationId: 1, status: 1 });
resourceSchema.index({ providerOrganizationId: 1, type: 1 });

export default mongoose.model('Resource', resourceSchema);

