import {LocationProgress} from './locationProgress';

export class LocationProgressLog {
  name: string;
  hasIncreased: boolean;
  timestamp: Date;
  locationProgress: LocationProgress;
  modeProgress: number;
  mapProgress: number;
  streak: number;
}

export class DBLocationProgressLog {
  hasIncreased: number;
  timestamp: string;
  name: string;
  locationProgress: LocationProgress;
  modeProgress: number;
  mapProgress: number;
  streak: number;
}
