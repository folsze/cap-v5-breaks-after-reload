import {TotalProgress} from './TotalProgress';
import {AchievementCategoryName} from '../enums/names/achievement-category-name';

export class AchievementCategory {
  name: AchievementCategoryName; // also used to access svg
  singleNames: [string, string, string];
  progress: TotalProgress;
}
