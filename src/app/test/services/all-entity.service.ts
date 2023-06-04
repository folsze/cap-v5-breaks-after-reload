import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {DepartmentEmployeesService} from "../../services/department-employees.service";

// Model for mapGroup table
class MapGroup {
  name: string;
}

// Model for map table
class AppMap {
  mapGroupName: string;
  name: string;
  progress: number;
  containsPins: boolean;
}

// Model for mode table
class Mode {
  name: string;
}

// Model for location table
class AppLocation {
  name: string;
  type: string;
}

// Model for locationContainedInMap table
class LocationContainedInMap {
  locationName: string;
  mapName: string;
}

// Model for modeContainedInMap table
class ModeContainedInMap {
  modeName: string;
  mapName: string;
  modeProgress: number;
  inputLabel: string;
  inputPlaceholder: string;
}

// Model for locationProgressForMode table
class LocationProgressForMode {
  locationName: string;
  modeName: string;
  streak: number;
  progress: number;
}

// Model for locationProgressLog table
class LocationProgressLog {
  hasIncreased: boolean;
  timestamp: string;
  modeName: string;
  mapName: string;
  streak: number;
  name: string;
  mapProgress: number;
  modeProgress: number;
  locationProgress: number;
}

@Injectable({
  providedIn: 'root'
})
export class AllEntityService {

  constructor(private mapModeLocationService: DepartmentEmployeesService) { }

  public getAllMapGroups(): Observable<MapGroup[]> {
    const stmt = `SELECT * FROM mapGroup`;
    return this.mapModeLocationService.dbQuery<MapGroup>(stmt);
  }

  public getAllMaps(): Observable<AppMap[]> {
    const stmt = `SELECT * FROM map`;
    return this.mapModeLocationService.dbQuery<AppMap>(stmt);
  }

  public getAllModes(): Observable<Mode[]> {
    const stmt = `SELECT * FROM mode`;
    return this.mapModeLocationService.dbQuery<Mode>(stmt);
  }

  public getAllLocations(): Observable<AppLocation[]> {
    const stmt = `SELECT * FROM location`;
    return this.mapModeLocationService.dbQuery<AppLocation>(stmt);
  }

  public getAllLocationsContainedInMaps(): Observable<LocationContainedInMap[]> {
    const stmt = `SELECT * FROM locationContainedInMap`;
    return this.mapModeLocationService.dbQuery<LocationContainedInMap>(stmt);
  }

  public getAllModesContainedInMaps(): Observable<ModeContainedInMap[]> {
    const stmt = `SELECT * FROM modeContainedInMap`;
    return this.mapModeLocationService.dbQuery<ModeContainedInMap>(stmt);
  }

  public getAllLocationProgressForModes(): Observable<LocationProgressForMode[]> {
    const stmt = `SELECT * FROM locationProgressForMode`;
    return this.mapModeLocationService.dbQuery<LocationProgressForMode>(stmt);
  }

  public getAllLocationProgressLogs(): Observable<LocationProgressLog[]> {
    const stmt = `SELECT * FROM locationProgressLog`;
    return this.mapModeLocationService.dbQuery<LocationProgressLog>(stmt);
  }
}
