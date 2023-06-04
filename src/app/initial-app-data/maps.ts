import { MapGroupName } from '../enums/names/MapGroupName';
import { InitialAppMap } from './InitialAppMap';
import {MapName} from '../enums/names/MapName';

export const DB_MAPS: InitialAppMap[] = [
  new InitialAppMap(MapName.austriaStates, MapGroupName.world), // flags
  new InitialAppMap(MapName.austriaRegions, MapGroupName.world),
  new InitialAppMap(MapName.viennasDistricts, MapGroupName.world), // flags
  new InitialAppMap(MapName.viennasSubDistricts, MapGroupName.world),
  new InitialAppMap(MapName.austriaCities, MapGroupName.world, true),
  new InitialAppMap(MapName.austriaMountains, MapGroupName.world, true),
  new InitialAppMap(MapName.austriaLakes, MapGroupName.world, true),
  new InitialAppMap(MapName.unitedStates, MapGroupName.world), // cities & flags
  new InitialAppMap(MapName.germanyStates, MapGroupName.world), // cities & flags
  new InitialAppMap(MapName.africaCountries, MapGroupName.world),
  new InitialAppMap(MapName.africaCities, MapGroupName.world, true),
  new InitialAppMap(MapName.southAmericaCountries, MapGroupName.world),
  new InitialAppMap(MapName.southAmericaCities, MapGroupName.world, true),
  new InitialAppMap(MapName.europeCountries, MapGroupName.world), // cities/capitals & flags
  new InitialAppMap(MapName.indiaStates, MapGroupName.world),
  new InitialAppMap(MapName.indiaCities, MapGroupName.world, true),
  new InitialAppMap(MapName.brazilStates, MapGroupName.world),
  new InitialAppMap(MapName.russiaCities, MapGroupName.world, true),
  new InitialAppMap(MapName.biggestCountries, MapGroupName.world), // cities
  new InitialAppMap(MapName.topographySouthAmerica, MapGroupName.world),
  new InitialAppMap(MapName.topographyAsia, MapGroupName.world),
  new InitialAppMap(MapName.topographyAfrica, MapGroupName.world),
];
