import {LocationType} from '../enums/LocationType';
import {LocationProgress} from '../models/locationProgress';

/**
 * Only used for the initial insertion, to have less chaotic initial-insert data
 *
 * Actually it is all about setting the two properties progress and streak to 0.
 *
 * While this could be done with optional params too, this would make it more error prone,
 * since sometimes I could forget to add progress and streak.
 */
export class InitialAppLocation {
  name: string;
  type: LocationType;
  progress: LocationProgress;
  streak: number;
  mapName?: string;
  mapNames?: string[];

  constructor(name: string, type: LocationType, mapName?: string, mapNames?: string[]) {
    this.name = name;
    this.type = type;
    this.progress = 0;
    this.streak = 0;
    this.mapName = mapName;
    this.mapNames = mapNames;
  }
}
