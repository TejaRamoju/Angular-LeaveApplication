import { Component, OnInit } from '@angular/core';
import {data} from "../_data/gridData";
import { GridDataService } from '../_services/grid-data.service';
import { LeaveService } from '../_services/leave.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  ngOnInit(): void {
    this.getLeavesData();
  }
  employeeData:any = [];
  leaveData:any = [];


  constructor(private leaveService:LeaveService) {
    // console.log(data);

  }
  getLeavesData(){
    this.leaveService.getLeaves().subscribe((res:any) => {
      this.leaveData=res;
      
      console.log(this.leaveData);
      this.employeeData = this.leaveData;
    })
  }

}
