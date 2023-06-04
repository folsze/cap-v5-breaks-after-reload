import {MapGroupName} from '../../enums/names/MapGroupName';

export interface DBAppMap {
  name: string;
  mapGroupName: MapGroupName;
  containsPins: number;
  progress: number; // [0;1]
}
