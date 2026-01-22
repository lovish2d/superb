/**
 * Resource Allocation Model
 * Tracks resource usage and allocations
 */
import mongoose from 'mongoose';

const resourceAllocationSchema = new mongoose.Schema({
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
    required: true,
    index: true,
  },
  customerOrganizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
    index: true,
  },
  allocatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
    index: true,
  },
  endTime: {
    type: Date,
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'cancelled'],
    default: 'pending',
    index: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

// Compound indexes for efficient queries
resourceAllocationSchema.index({ resourceId: 1, status: 1 });
resourceAllocationSchema.index({ customerOrganizationId: 1, status: 1 });
resourceAllocationSchema.index({ startTime: 1, endTime: 1 });

export default mongoose.model('ResourceAllocation', resourceAllocationSchema);

