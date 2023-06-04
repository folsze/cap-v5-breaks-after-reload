import {AppMapForList} from './AppMapForList';
import {MapGroupName} from '../../enums/names/MapGroupName';

export interface MapGroupDetail {
  name: MapGroupName;
  maps: AppMapForList[];
}
