/**
 * Role Model
 * Roles are scoped to either platform (for platform_owner users) or organization (for customer users)
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
    // organizationId is required if scope is 'organization', null if scope is 'platform'
    validate: {
      validator: function(value) {
        if (this.scope === 'organization') {
          return value != null;
        }
        return value == null;
      },
      message: 'Organization ID is required for organization-scoped roles and must be null for platform-scoped roles',
    },
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
// Unique constraint: same role name cannot exist twice for the same scope/organization
roleSchema.index({ name: 1, scope: 1, organizationId: 1 }, { unique: true });
roleSchema.index({ scope: 1, organizationId: 1, isActive: 1 });
roleSchema.index({ scope: 1, isActive: 1 });

export default mongoose.model('Role', roleSchema);

