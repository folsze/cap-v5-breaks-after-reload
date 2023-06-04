import {ModeName} from '../enums/names/ModeName';
import {MapName} from '../enums/names/MapName';

export class ModeContainedInMap {
  modeName: string;
  mapName: string;
  modeProgress: number; // [0; 1]
  inputLabel?: string;
  inputPlaceholder?: string;

  constructor(
    modeName: string,
    mapName: string,
    inputLabel?: string,
    inputPlaceholder?: string
  ) {
    this.modeName = modeName;
    this.mapName = mapName;
    this.modeProgress = 0;
    this.inputLabel = inputLabel;
    this.inputPlaceholder = inputPlaceholder;
  }

  getSqlValues(): (string | number)[] {
    if (this.inputLabel && this.inputPlaceholder) {
      return [this.modeName, this.mapName, this.modeProgress, this.inputLabel, this.inputPlaceholder];
    }
    else {
      return [this.modeName, this.mapName, this.modeProgress];
    }
  }
}

export const MODES_CONTAINED_IN_MAPS: ModeContainedInMap[] = [
  new ModeContainedInMap(ModeName.touchMode, MapName.austriaStates),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.austriaStates, 'State name', 'Niederösterreich'),
  new ModeContainedInMap(ModeName.touchMode, MapName.austriaRegions),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.austriaRegions, 'Region name', 'Mühlviertel'),
  new ModeContainedInMap(ModeName.touchMode, MapName.viennasDistricts),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.viennasDistricts, 'District name', 'Döbling'),
  new ModeContainedInMap(ModeName.touchMode, MapName.viennasSubDistricts),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.viennasSubDistricts, 'Sub-District name', 'Pötzleinsdorf'),
  new ModeContainedInMap(ModeName.touchMode, MapName.austriaCities),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.austriaCities, 'City name', 'St. Pölten'),
  new ModeContainedInMap(ModeName.touchMode, MapName.austriaMountains),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.austriaMountains, 'Mountain name', 'Hochkönig'),
  new ModeContainedInMap(ModeName.touchMode, MapName.austriaLakes),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.austriaLakes, 'Lake name', 'Millstätter See'),
  new ModeContainedInMap(ModeName.touchMode, MapName.unitedStates),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.unitedStates, 'State name', 'Hawaii'),
  new ModeContainedInMap(ModeName.touchMode, MapName.germanyStates),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.germanyStates, 'State name', 'Baden-Württemberg'),
  new ModeContainedInMap(ModeName.touchMode, MapName.africaCountries),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.africaCountries, 'Country name', 'Ivory Coast'),
  new ModeContainedInMap(ModeName.touchMode, MapName.africaCities),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.africaCities, 'City name', 'Lagos'),
  new ModeContainedInMap(ModeName.touchMode, MapName.southAmericaCountries),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.southAmericaCountries, 'Country name', 'French Guiana'),
  new ModeContainedInMap(ModeName.touchMode, MapName.southAmericaCities),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.southAmericaCities, 'City name', 'Rio de Janeiro'),
  new ModeContainedInMap(ModeName.touchMode, MapName.europeCountries),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.europeCountries, 'Country name', 'Bosnia and Herzegovina'),
  new ModeContainedInMap(ModeName.touchMode, MapName.indiaStates),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.indiaStates, 'State name', 'West Bengal'),
  new ModeContainedInMap(ModeName.touchMode, MapName.indiaCities),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.indiaCities, 'City name', 'Mumbai'),
  new ModeContainedInMap(ModeName.touchMode, MapName.brazilStates),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.brazilStates, 'State name', 'Rio Grande do Norte'),
  new ModeContainedInMap(ModeName.touchMode, MapName.russiaCities),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.russiaCities, 'City name', 'Saint Petersburg'),
  new ModeContainedInMap(ModeName.touchMode, MapName.biggestCountries),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.biggestCountries, 'Country Name', 'DR Congo'),
  new ModeContainedInMap(ModeName.touchMode, MapName.topographySouthAmerica),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.topographySouthAmerica, 'Name', 'Falkland Islands'),
  new ModeContainedInMap(ModeName.touchMode, MapName.topographyAsia),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.topographyAsia, 'Name', 'Mount Everest'),
  new ModeContainedInMap(ModeName.touchMode, MapName.topographyAfrica),
  new ModeContainedInMap(ModeName.keyboardMode, MapName.topographyAfrica, 'Name', 'Kilimanjaro'),
];
