import { Injectable } from '@angular/core';
import {data} from '../_data/gridData';

@Injectable({
  providedIn: 'root'
})
export class GridDataService {
employeesData:any = [];
  constructor() {
    this.employeesData = data;
   }

   getEmployees(){
     return this.employeesData;
   }

}
