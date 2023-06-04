import {Component, OnInit} from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import {InfiniteScrollCustomEvent} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {AllEntityService} from './services/all-entity.service';
import {InitializeAppService} from "../services/initialize.app.service";
import {DepartmentEmployeesService} from "../services/department-employees.service";
import {MapGroupName} from "../enums/names/MapGroupName";

type Entity =
  | MapGroup
  | AppMap
  | Mode
  | AppLocation
  | LocationContainedInMap
  | ModeContainedInMap
  | LocationProgressForMode
  | LocationProgressLog;

interface Indexable {
  [key: string]: any;
}

// Model for mapGroup table
class MapGroup implements Indexable {
  name: string;
}

// Model for map table
class AppMap implements Indexable {
  mapGroupName: string;
  name: string;
  progress: number;
  containsPins: boolean;
}

// Model for mode table
class Mode implements Indexable {
  name: string;
}

// Model for location table
class AppLocation implements Indexable {
  name: string;
  type: string;
}

// Model for locationContainedInMap table
class LocationContainedInMap implements Indexable {
  locationName: string;
  mapName: string;
}

// Model for modeContainedInMap table
class ModeContainedInMap implements Indexable {
  modeName: string;
  mapName: string;
  modeProgress: number;
  inputLabel: string;
  inputPlaceholder: string;
}

// Model for locationProgressForMode table
class LocationProgressForMode implements Indexable {
  locationName: string;
  modeName: string;
  streak: number;
  progress: number;
}

// Model for locationProgressLog table
class LocationProgressLog implements Indexable {
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

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  public Object = Object;
  public entities$: Observable<Entity[]>;

  private readonly CHUNK_SIZE = 50;
  public displayedLocationsCount = this.CHUNK_SIZE;
  private startTime = new Date().getTime();

  constructor(
    private route: ActivatedRoute,
    private allEntityService: AllEntityService,
    public initializeAppService: InitializeAppService,
    private datService: DepartmentEmployeesService
  ) { }

  ngOnInit() {
    this.entities$ = this.route.params.pipe(
      switchMap(params => {
        const entityType = params.entity;
        switch (entityType) {
          case 'mapGroup':
            return this.allEntityService.getAllMapGroups();
          case 'map':
            return this.allEntityService.getAllMaps();
          case 'mode':
            return this.allEntityService.getAllModes();
          case 'location':
            return this.allEntityService.getAllLocations();
          case 'locationContainedInMap':
            return this.allEntityService.getAllLocationsContainedInMaps();
          case 'modeContainedInMap':
            return this.allEntityService.getAllModesContainedInMaps();
          case 'locationProgressForMode':
            return this.allEntityService.getAllLocationProgressForModes();
          case 'locationProgressLog':
            return this.allEntityService.getAllLocationProgressLogs();
          default:
            throw new Error(`Unsupported entity type: ${entityType}`);
        }
      })
    );
  }

  getEntityProperties(entity: Entity): Indexable {
    return entity as Indexable;
  }

  ionViewDidEnter() {
    const elapsed = new Date().getTime() - this.startTime;
    console.log('ionViewDidEnter after', elapsed, 'ms.');
  }

  onIonInfinite(ev: any) {
    this.displayedLocationsCount += this.CHUNK_SIZE;
    // setTimeout(() => {
    //   (ev as InfiniteScrollCustomEvent).target.complete();
    // }, 0); // if this is more, the user will have to scroll up & down again
    (ev as InfiniteScrollCustomEvent).target.complete();
  }

  runStatement1() {
    this.datService.updateMapGroupName(MapGroupName.world, 'wrld' as MapGroupName);
  }

  runStatement2() {
    this.datService.insertNewMapGroup('Australia');
  }

}
