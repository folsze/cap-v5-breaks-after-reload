import {AchievementCategoryName} from '../enums/names/achievement-category-name';

export interface TotalProgress {
  type?: AchievementCategoryName; // the type of location. If undefined: Generic location. note: idek why '?'
  maxProgressLocationCount: number;
  totalLocationCount: number;
}
