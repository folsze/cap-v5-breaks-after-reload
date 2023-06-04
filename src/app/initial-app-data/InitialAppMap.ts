import {MapGroupName} from '../enums/names/MapGroupName';

/**
 * Only used for the initial insertion, to have less chaotic initial-insert data
 *
 * Actually it is all about setting the propertiy progress to 0.
 *
 * While this could be done with optional params too, this would make it more error prone,
 * since sometimes I could forget to add progress and streak.
 */
export class InitialAppMap {
  name: string;
  mapGroupName: MapGroupName;
  containsPins: number;
  progress: number; // [0;1]
  // NOTE: cannot use get function if I don't have a constructor which initializes them

  constructor(name: string, mapGroupName: MapGroupName, containsPins?: boolean) {
    this.name = name;
    this.mapGroupName = mapGroupName;
    this.containsPins = containsPins ? 1 : 0;
    this.progress = 0;
  }
}
