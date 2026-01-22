export type StandStatus = 'available' | 'in_use' | 'in_transit' | 'maintenance' | 'new_listed' | 'deactivated';

export type StandType = 'homebase' | 'pool' | 'third-party';

export type Stand = {
  id: string;
  standId: string;
  trackingId: string;
  standType: StandType;
  measurement: {
    length: number;
    width: number;
    height: number;
    unit: string;
    weight: number;
    weightUnit: string;
  };
  oem: {
    name: string;
    engine: string;
  };
  engineCompatibility: string[];
  engineStatus: 'empty' | 'occupied';
  customer: {
    name: string;
    location: string;
    countryCode?: string;
  };
  status: StandStatus;
};

export type StandDetail = Stand & {
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
  technical?: {
    trackerId: string;
    trackerStatus: 'active' | 'inactive';
    trackerImageUrl?: string;
    battery: number;
    batteryStatus: 'excellent' | 'good' | 'low' | 'critical';
    temperature: number;
    temperatureUnit: 'C' | 'F';
    temperatureStatus: 'normal' | 'high' | 'low';
    shockMountLife: number;
    shockMountStatus: 'pool_use_only' | 'customer_use' | 'expired';
    uptime: number;
    uptimeUnit: 'days' | 'hours';
    signalStrength: number;
  };
  standConfiguration?: {
    standOem: string;
    engineType: string;
    engineOem: string;
    basePartNumber: string;
    baseSerialNumber: string;
    cradlePartNumber: string;
    cradleSerialNumber: string;
    compatibleAircrafts: string[];
  };
  physicalSpecifications?: {
    withEngine: {
      dimensions: {
        length: number;
        width: number;
        height: number;
        unit: string;
      };
      weight: number;
      weightUnit: string;
    };
    withoutEngine: {
      dimensions: {
        length: number;
        width: number;
        height: number;
        unit: string;
      };
      weight: number;
      weightUnit: string;
    };
    engineStatus: 'empty' | 'occupied';
  };
};

