/**
 * Role Model for Auth Service
 * Shares the same collection as Platform Service Role model
 */
import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  scope: {
    type: String,
    enum: ['platform', 'organization'],
    required: true,
    index: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    index: true,
  },
  description: {
    type: String,
    trim: true,
  },
  permissions: [{
    type: String,
    trim: true,
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
}, {
  timestamps: true,
});

// Compound indexes
roleSchema.index({ name: 1, scope: 1, organizationId: 1 }, { unique: true });
roleSchema.index({ scope: 1, organizationId: 1, isActive: 1 });
roleSchema.index({ scope: 1, isActive: 1 });

export default mongoose.model('Role', roleSchema);

