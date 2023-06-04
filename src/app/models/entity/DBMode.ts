import {ModeName} from '../../enums/names/ModeName';

export interface DBMode {
  name: ModeName;
}

// idek if this is good practice... this is not an entity for sure...
// but doing it like this is way simpler than doing an extra query...
export interface DBModeForList {
  name: ModeName;
  progress: number;
}
