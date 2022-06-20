import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeaveService } from 'src/app/_services/leave.service';
import { LogInService } from 'src/app/_services/log-in.service';

@Component({
  selector: 'app-apply-leaves',
  templateUrl: './apply-leaves.component.html',
  styleUrls: ['./apply-leaves.component.css']
})
export class ApplyLeavesComponent implements OnInit {
  currentUser:any = {};
  date1 = new Date;
  formData: any = {
    date : this.date1.toLocaleString(),
    leaveType: '',
    leaveDays: 0,
    employeeName: this.currentUser.username,
    jobTitle: '',
    city: '',
    connection: '',
    status:'Pending'
  }


  constructor(private leaveService: LeaveService,private loginService:LogInService) {}
    

  ngOnInit(): void {
    this.loginService.currentUser$.subscribe((res:any) => {
      this.currentUser = res;
      console.log(res);
      this.formData.employeeName = res.username;
    })
  
  }

  addLeave() {
    console.log("formData :",this.formData);
    this.leaveService.postLeave(this.formData).subscribe(res => {
      console.log("add leave:", res);
      this.formData = {
        date : this.date1.toLocaleString(),
        leaveType: '',  
        leaveDays: 0,
        employeeName: this.currentUser.username,
        jobTitle: '',
        city: '',
        connection: '',
        status:'Pending'
      }

    });
  }


}



