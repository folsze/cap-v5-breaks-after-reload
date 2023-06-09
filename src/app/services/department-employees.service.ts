import {capSQLiteChanges, SQLiteDBConnection} from '@capacitor-community/sqlite';
import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, from, Observable} from 'rxjs';

import { SQLiteService } from './sqlite.service';
import { DbnameVersionService } from './dbname-version.service';
import { deptEmployeesVersionUpgrades } from 'src/app/upgrades/employee-dept/upgrade-statements';

import { Employee, EmployeeData, Department } from '../models/employee-dept';
import { IdsSeq } from '../models/ids-seq';
import {MapGroupName} from "../enums/names/MapGroupName";
import {mapModeLocationVersionUpgrades} from "../upgrades/upgrade-statements";
import {environment} from "../../environments/environment";


@Injectable()
export class DepartmentEmployeesService {
  public databaseName: string;
  public employeeList: BehaviorSubject<EmployeeData[]> = new BehaviorSubject<EmployeeData[]>([]);
  public departmentList: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>([]);
  public idsSeqList: BehaviorSubject<IdsSeq[]> = new BehaviorSubject<IdsSeq[]>([]);

  private isEmployeeReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isDepartmentReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isIdsSeqReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private versionUpgrades = mapModeLocationVersionUpgrades;
  private loadToVersion = deptEmployeesVersionUpgrades[deptEmployeesVersionUpgrades.length-1].toVersion;
  private mDb!: SQLiteDBConnection;

  constructor(  private sqliteService: SQLiteService,
    private dbVerService: DbnameVersionService,
  ) {
    this.databaseName = environment.databaseNames.filter(x => x.name.includes('maps'))[0].name;
  }


  async initializeDatabase() {
    // create upgrade statements
    await this.sqliteService
    .addUpgradeStatement({ database: this.databaseName,
                            upgrade: this.versionUpgrades});
    // create and/or open the database
    await this.openDatabase();
    this.dbVerService.set(this.databaseName,this.loadToVersion);
    const isData = await this.mDb.query("select * from mapGroup");
    // create database initial data
    if(isData.values!.length === 0) {
      await this.createInitialData();
    }
    if( this.sqliteService.platform === 'web') {
      await this.sqliteService.sqliteConnection.saveToStore(this.databaseName);
    }
    await this.getAllData();
  }
  async openDatabase() {
    if(this.sqliteService.native
      && (await this.sqliteService.isInConfigEncryption()).result
      && (await this.sqliteService.isDatabaseEncrypted(this.databaseName)).result) {
      this.mDb = await this.sqliteService
        .openDatabase(this.databaseName, true, "secret",
                        this.loadToVersion,false);

    } else {
      console.log('WEB MODE');
      this.mDb = await this.sqliteService
        .openDatabase(this.databaseName, false, "no-encryption",
                      this.loadToVersion,false);
    }
  }
  async getAllData() {
    // await this.getAllEmployees();
    // this.isEmployeeReady.next(true);
    //
    // await this.getAllDepartments();
    // this.isDepartmentReady.next(true);
    await this.getAllIdsSeq();
    this.isIdsSeqReady.next(true);
  }

  /**
   * Return Employee state
   * @returns
   */
  employeeState() {
    return this.isEmployeeReady.asObservable();
  }
  /**
   * Return Department state
   * @returns
   */
  departmentState() {
    return this.isDepartmentReady.asObservable();
  }
  /**
   * Return Ids Sequence state
   * @returns
   */
  idsSeqState() {
    return this.isIdsSeqReady.asObservable();
  }

  /**
   * Fetch Employees
   * @returns
   */
  fetchEmployees(): Observable<EmployeeData[]> {
    return this.employeeList.asObservable();
  }
  /**
   * Fetch Departments
   * @returns
   */
  fetchDepartments(): Observable<Department[]> {
    return this.departmentList.asObservable();
  }
  /**
   * Fetch Ids Sequence
   * @returns
   */
  fetchIdsSeq(): Observable<IdsSeq[]> {
    return this.idsSeqList.asObservable();
  }
  /**
   * Get, Create, Update an Employee
   * @returns
   */
  async getEmployee(jsonEmployee: Employee): Promise<Employee> {
    let retEmployee = await this.sqliteService.findOneBy(this.mDb, "employee", {empid: jsonEmployee.empid}) as Employee;
    if(!retEmployee) {
      if(jsonEmployee.name) {
        // create a new Employee
        const employee: Employee = await this.createEmployee(jsonEmployee);
        await this.sqliteService.save(this.mDb, "employee", employee);
        retEmployee = await this.sqliteService.findOneBy(this.mDb, "employee", {empid: jsonEmployee.empid}) as Employee;
        return retEmployee;
      } else {
        // post not in the database
        const mEmployee = new Employee();
        mEmployee.empid = -1;
        return mEmployee;
      }
    } else {
      if(Object.keys(jsonEmployee).length > 1) {
        // update an existing Employee
        const updEmployee = await this.createEmployee(jsonEmployee);
        await this.sqliteService.save(this.mDb, "employee", updEmployee, {empid: jsonEmployee.empid});
        const employee = (await this.sqliteService.findOneBy(this.mDb, "employee", {empid: jsonEmployee.empid})) as Employee;
        if(employee) {
          return employee;
        } else {
          return Promise.reject(`failed to getEmployee for empid ${jsonEmployee.empid}`);
        }
      } else {
        return retEmployee;
      }
    }
  }
  /**
   * Delete an Employee
   * @returns
   */
  async deleteEmployee(jsonEmployee: Employee): Promise<void>  {
    let employee = await this.sqliteService.findOneBy(this.mDb, "employee", {empid: jsonEmployee.empid});
    if( employee) {
      await this.sqliteService.remove(this.mDb, "employee", {empid: jsonEmployee.empid});;
    }
  }

  /**
   * Get all Employees
   * @returns
   */
  async getAllEmployees(): Promise<void> {
    // Query the employee table
    const stmt = `select empid, employee.name as name, title, department.deptid as dept_deptid, department.name as dept_name,
    department.location as location from employee
    INNER JOIN department ON  dept_deptid = employee.deptid
    ORDER BY dept_name, empid ASC
    `;

    const employees = (await this.mDb.query(stmt)).values;
    const empsData: EmployeeData[] = [];
    for (const emp of employees!) {
      const empData = new EmployeeData();
      empData.empid = emp.empid;
      empData.name = emp.name;
      empData.title = emp.title;
      const department = new Department();
      department.deptid = emp.dept_deptid;
      department.name = emp.dept_name;
      department.location = emp.location;
      empData.department = department;
      empsData.push(empData);
    }
    this.employeeList.next(empsData);

  }

  /**
   * Get, Create, Update a Department
   * @returns
   */
  async getDepartment(jsonDepartment: Department): Promise<Department> {
    let department = await this.sqliteService.findOneBy(this.mDb, "department", {deptid: jsonDepartment.deptid});
    if(!department) {
      if(jsonDepartment.name) {
        // create a new department
        department = new Department();
        department.deptid = jsonDepartment.deptid;
        department.name = jsonDepartment.name;
        if(jsonDepartment.location) {
          department.location = jsonDepartment.location;
        }

        await this.sqliteService.save(this.mDb, "department", department);
        department = await this.sqliteService.findOneBy(this.mDb, "department", {deptid: jsonDepartment.deptid});
        if(department) {
          return department;
        } else {
          return Promise.reject(`failed to getDepartment for id ${jsonDepartment.deptid}`);
        }
      } else {
        // department not in the database
        department = new Department();
        department.deptid = -1;
        return department;
      }
    } else {
      if(Object.keys(jsonDepartment).length > 1) {
        // update and existing department
        const updDepartment = new Department();
        updDepartment.deptid = jsonDepartment.deptid;
        updDepartment.name = jsonDepartment.name;
        if(jsonDepartment.location) {
          updDepartment.location= jsonDepartment.location;
        }

        await this.sqliteService.save(this.mDb, "department", updDepartment, {deptid: jsonDepartment.deptid});
        department = await this.sqliteService.findOneBy(this.mDb, "department", {deptid: jsonDepartment.deptid});
        if(department) {
          return department;
        } else {
          return Promise.reject(`failed to getDepartment for deptid ${jsonDepartment.deptid}`);
        }
      } else {
        return department;
      }
    }
  }
  /**
   * Delete a Department
   * @returns
   */
  async deleteDepartment(jsonDepartment: Department): Promise<void>  {
    let department = await this.sqliteService.findOneBy(this.mDb, "department", {deptid: jsonDepartment.deptid});
    if( department) {
      await this.sqliteService.remove(this.mDb, "department", {deptid: jsonDepartment.deptid});
    }
    return;
  }
  /**
   * Get all Departments
   * @returns
   */
  async getAllDepartments(): Promise<void> {
    const departments: Department[] = (await this.mDb.query("select * from department")).values as Department[];
    this.departmentList.next(departments);
  }
  /**
   * Get
   * all Ids Sequence
   * @returns
   */
  async getAllIdsSeq(): Promise<void> {
    const idsSeq: IdsSeq[] = (await this.mDb.query("select * from sqlite_sequence")).values as IdsSeq[];
    this.idsSeqList.next(idsSeq);
  }
  /**
   * Get Employee from EmployeeData
   * @param employee
   * @returns
   */
  getEmployeeFromEmployeeData(employee: EmployeeData): Employee {
    const employeeJson: Employee = new Employee();
    employeeJson.empid = employee.empid;
    employeeJson.title = employee.title;
    employeeJson.name = employee.name;
    const department: Department = employee.department;
    employeeJson.deptid = department.deptid;
    return employeeJson;
  }

  public dbQuery<T>(stmt: string, stmtValues?: (string | number)[], debugInfo?: string): Observable<T[]> {
    return from(
      (async () => {
        let values;
        try { // NOTE: this try catch was necessary. Else the error wouldn't get output in the web-console AT ALL!
          values = (await this.mDb.query(stmt, stmtValues)).values;
        } catch (error: any) {
          console.error(error);
        }

        if (!values) {
          console.error('Assertion failed');
        } else if (!(values.length > 0)) {
          console.error('Assertion failed - didnt expect 0 rows to be modified:', values.length, 'debugInfo', debugInfo);
          throw new Error('Felix: db query failed');
        }
        return values as T[];
      })()
    );
  }

  private dbRun(stmt: string, values?: (string | number)[]): Observable<capSQLiteChanges> {
    return from(this.mDb.run(stmt, values)).pipe(
      catchError(err => {
        console.error(err);
        throw err; // re-throw the error so it can be caught in the calling function
      })
    );
  }

  /*********************
   * Private Functions *
   *********************/

  /**
   * Create Database Initial Data
   * @returns
   */
  private async createInitialData(): Promise<void> {
    console.log('💾 Starting to create initial data...');
    await this.insertMapGroups()
    console.log('💾 Finished creating initial data.');
  }

  private async insertMapGroups() {
    const stmt = `INSERT INTO mapGroup (name) VALUES ${Object.values(MapGroupName).map(() => '(?)').join(', ')}`;
    const values = Object.values(MapGroupName);
    await this.mDb.run(stmt, values);
    // await this.dbRun(stmt, values);
  }

  /**
   * Create Employee
   * @returns
   */
  private async createEmployee(jsonEmployee:Employee): Promise<Employee> {
    const employee = new Employee();
    employee.empid = jsonEmployee.empid;
    employee.name = jsonEmployee.name;
    if(jsonEmployee.title) {
      employee.title = jsonEmployee.title;
    }
    employee.deptid = jsonEmployee.deptid;
    return employee;
  }

  public updateMapGroupName(oldName: MapGroupName, newName: MapGroupName) {
    const stmt1 = 'UPDATE mapGroup SET name = ? WHERE name = ?';
    const values1 = [newName, oldName];
    return this.dbRun(stmt1, values1);
  }

  public insertNewMapGroup(newName: string) {
    const stmt = 'INSERT INTO mapGroup (name) VALUES (?)';
    const values = [newName];
    return this.dbRun(stmt, values);
  }

}
