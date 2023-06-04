import {LocationProgress} from '../locationProgress';
import {LocationType} from '../../enums/LocationType';

export class DBAppLocation {
  name: string;
  type: LocationType;
  progress: LocationProgress;
  streak: number;
  // NOTE: cannot use get function if I don't have a constructor which initializes them

  constructor(name: string, type: LocationType) {
    this.name = name;
    this.type = type;
    this.progress = 0;
    this.streak = 0;
  }
}
