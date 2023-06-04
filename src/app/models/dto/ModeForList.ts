import {ModeName} from '../../enums/names/ModeName';

export class ModeForList {
  name: ModeName;
  progress: number; // [0;1]

  constructor(name: ModeName, progress: number) {
    this.name = name;
    this.progress = progress;
  }
}
