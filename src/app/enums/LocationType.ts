export enum LocationType {
  uncategorized = 'uncategorized', // currently: outgoing candidates: region maybe? but Magellan strait stuff stays for sure.
  city = 'city',
  cityDistrict = 'cityDistrict', // this includes: sub-district etc., but does not include e.g. russia districts
  country = 'country',
  state = 'state',
  desert = 'desert',
  mountain = 'mountain',
  river = 'river',
  standingWater = 'standingWater',
  island = 'island',
}

export const badgedLocationTypes = [
  LocationType.city,
  // LocationType.country, commented out because I couldn't find good badge icons
  LocationType.desert,
  LocationType.mountain,
  LocationType.river,
  LocationType.standingWater
];
