export const AchievementCategoryName = {
  locations: 'locations',
  city: 'city',
  desert: 'desert',
  mountain: 'mountain',
  river: 'river',
  standingWater: 'standingWater',
} as const;

export type AchievementCategoryName = typeof AchievementCategoryName[keyof typeof AchievementCategoryName];

// Usage example:
// const someString: AchievementCategoryName = 'city'; // This is valid
// const anotherString: AchievementName = 'notAnAchievement'; // This will cause a compile-time error
// In this example, the AchievementName type is created from the AchievementName object using the typeof keyword. By using as const, we ensure that the object properties are read-only and their types are narrowed to the exact string values. Then, we use the keyof keyword to create a union type of the allowed string values. This type will enforce that only the specified string values are assignable to variables of the AchievementName type, causing a compile-time error if an invalid string value is assigned.
