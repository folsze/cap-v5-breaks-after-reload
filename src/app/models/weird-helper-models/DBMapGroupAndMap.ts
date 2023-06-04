import {MapGroupName} from '../../enums/names/MapGroupName';
import {MapName} from '../../enums/names/MapName';

export interface DBMapGroupAndMap {
  mapGroupName: MapGroupName;
  mapName: MapName;
  mapProgress: number;
}
