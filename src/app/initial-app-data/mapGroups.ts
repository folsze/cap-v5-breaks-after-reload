import {MapGroupDetail, MapGroupName} from '../models/dto/MapGroupDetail';

export const DB_MAP_GROUPS: MapGroupDetail[] = Object.keys(MapGroupName).map(
  (key) => ({name: MapGroupName[key as keyof typeof MapGroupName]})
);
