# Stand Detail Page Documentation

## Overview

The Stand Detail page displays comprehensive information about a specific aircraft engine stand. It is accessible by clicking on any stand from the Stands Overview page (`/stands`).

## Route

- **Path**: `/stands/:id`
- **Component**: `src/pages/platform/Stands/StandDetail/index.tsx`
- **Guard**: Protected by `AuthGuard` (requires authentication)

## Features

### 1. Breadcrumb Navigation

- **Home** → **Stands** → **Overview** → **Stand ID**
- Uses the `Breadcrumb` component from `@/components/common/Breadcrumb`
- Clicking on "Stands" or "Overview" navigates back to `/stands`

### 2. Header Section

The header displays:
- **Stand Assignment Info**: Shows customer name (or "Unassigned") and pooling center code
- **Location**: Displays city and country with flag icon
- **Track Stand Button**: Opens tracking functionality (outlined button with MapPin icon)

### 3. Tabs Navigation

Four tabs are available:
- **Overview** (default): Shows stand details and status information
- **Technical**: Technical specifications (coming soon)
- **Maintenance**: Maintenance history and schedules (coming soon)
- **Timeline**: Stand activity timeline (coming soon)

### 4. Stand Status Badge

The status badge displays the current stand status with color coding:
- **Available**: Green background (#ECFDF5) with green text (#00BC7D)
- **In Use**: Blue background with blue text
- **In Transit**: Yellow background with yellow text
- **Maintenance**: Red background with red text
- **New Listed**: Light blue background with blue text
- **Deactivated**: Gray background with gray text

### 5. Action Buttons

- **Schedule Maintenance**: Opens maintenance scheduling modal (outlined button)
- **Deploy to Customer**: Deploys stand to a customer (contained primary button)

### 6. Stand Image

- Displays stand image if available
- Placeholder shown if no image is provided
- Image dimensions: Full width, 316px height
- Border radius: 14px

### 7. Stand Details Card

Displays the following information in a grid layout:
- **Superb Stand ID**: The unique stand identifier
- **Manufacture Date**: Date when the stand was manufactured
- **Tracking Equipment ID**: IoT tracking device ID
- **Stand Age**: Age of the stand (e.g., "5 Years")
- **Color**: Stand color
- **Stackable for Storage**: Yes/No indicator

### 8. Stand Status Card

Displays status-related dates in a grid layout:
- **Registration Date**: When the stand was registered
- **Shock Mounts Manufacture Date**: Manufacturing date of shock mounts
- **Last Maintenance**: Date of last maintenance
- **Shock Mounts Expiry Date**: Expiry date for shock mounts
- **Next Maintenance**: Scheduled next maintenance date
- **Next Shock Mount Replacement**: Scheduled replacement date

## Data Structure

### StandDetail Type

```typescript
type StandDetail = Stand & {
  imageUrl?: string;
  assignment?: {
    customerName: string;
    poolingCenter: string;
  } | null;
  location: {
    city: string;
    country: string;
    countryCode: string;
  };
  details: {
    manufactureDate: string;
    standAge: string;
    color: string;
    stackable: boolean;
  };
  statusInfo: {
    registrationDate: string;
    shockMountsManufactureDate: string;
    lastMaintenance: string;
    shockMountsExpiryDate: string;
    nextMaintenance: string;
    nextShockMountReplacement: string;
  };
};
```

## API Integration

### Current Implementation

Currently uses mock data. The `useEffect` hook in `StandDetail` component fetches stand data based on the `id` parameter from the URL.

### TODO: API Integration

Replace the mock data fetch with an actual API call:

```typescript
// TODO: Replace with actual API call
const fetchStandDetail = async () => {
  setIsLoading(true);
  try {
    // Call API endpoint: GET /api/v1/stands/:id
    const response = await fetch(`/api/v1/stands/${id}`);
    const data = await response.json();
    setStand(data);
  } catch (error) {
    console.error('Error fetching stand detail:', error);
    // Handle error (show error message, redirect, etc.)
  } finally {
    setIsLoading(false);
  }
};
```

## Navigation Flow

1. User clicks on a stand ID in the Stands Overview table (`/stands`)
2. React Router navigates to `/stands/:id`
3. `StandDetail` component loads and fetches stand data
4. Stand detail page displays with all information

## Components Structure

```
StandDetail/
├── index.tsx                    # Main component
└── components/
    ├── StandDetailsCard/
    │   └── index.tsx            # Stand details information card
    └── StandStatusCard/
        └── index.tsx            # Stand status information card
```

## Translations

All user-facing text uses translation keys from `src/locales/en/stands.json`:

- `detail.page_title`: "Stand Detail"
- `detail.breadcrumb.*`: Breadcrumb labels
- `detail.header.*`: Header section labels
- `detail.tabs.*`: Tab labels
- `detail.status.*`: Status labels
- `detail.stand_details.*`: Stand details card labels
- `detail.stand_status.*`: Stand status card labels

## Styling

- Uses MUI theme colors from `@/theme`
- Follows design system defined in `CODING_STANDARDS.md`
- Responsive layout using CSS Grid for card layouts
- Consistent spacing using MUI spacing units

## Future Enhancements

1. **Technical Tab**: Display technical specifications, dimensions, and compatibility information
2. **Maintenance Tab**: Show maintenance history, schedules, and upcoming maintenance tasks
3. **Timeline Tab**: Display stand activity timeline with events and status changes
4. **Image Upload**: Allow users to upload/update stand images
5. **Status Updates**: Allow users to update stand status
6. **Edit Functionality**: Enable editing of stand details
7. **Print/Export**: Add ability to print or export stand information

## Testing

### Manual Testing Checklist

- [ ] Navigate to `/stands` and click on a stand ID
- [ ] Verify breadcrumb navigation works correctly
- [ ] Verify all tabs switch correctly
- [ ] Verify stand details are displayed correctly
- [ ] Verify status badge displays correct color
- [ ] Verify action buttons are visible and functional
- [ ] Verify stand image displays (or placeholder if missing)
- [ ] Test with different stand statuses
- [ ] Test with unassigned stands
- [ ] Verify responsive layout on different screen sizes

## Related Files

- **Route Configuration**: `src/App.tsx`
- **Stand Types**: `src/types/stand.types.ts`
- **Translations**: `src/locales/en/stands.json`
- **Stand Overview**: `src/pages/platform/Stands/index.tsx`
- **Stand Table**: `src/pages/platform/Stands/components/StandsTable/index.tsx`

