import {AppLocationDetail} from './AppLocationDetail';

/**
 * This is the data structure that will be queried when the user has selected the map & mode,
 * the main in-game data structure with all the data.
 */
export interface ModeInMapWithLocations {
  // the map DTO:
  mapName: string;
  containsPins?: boolean; // default is undefined, i.e. false :)
  // the mode DTO:
  modeName: string;
  modeProgress: number; // [0;1]
  inputLabel?: string;
  inputPlaceholder?: string;
  // the locations DTOs:
  locations: AppLocationDetail[];
}
