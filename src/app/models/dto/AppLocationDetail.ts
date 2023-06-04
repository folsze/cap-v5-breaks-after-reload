import {LocationProgress} from '../locationProgress';
import {LocationType} from '../../enums/LocationType';

export class AppLocationDetail {
  name: string;
  type: LocationType;
  progress: LocationProgress; // progress in the given mode
  streak: number;

  constructor(name: string,
              type: LocationType,
              population_OR_area_OR_length_OR_height_OR_identifier?: number, // will be used later, not rn.
              progress: LocationProgress = 0,
              streak: number = 0,
  ) {
    this.name = name;
    this.type = type;
    this.progress = progress;
    this.streak = streak;
  }

  public get emoji(): string {
    switch (this.progress) {
      case 0:
        return '😔';
      case 1:
        return '😒';
      case 2:
        return '😐';
      case 3:
        return '🙂';
      case 4:
        return '😊';
      case 5:
        return '😃';
      case 6:
        return '😆';
      case 7:
        return '🤩';
      default:
        return '🪲';
    }
  }
}
