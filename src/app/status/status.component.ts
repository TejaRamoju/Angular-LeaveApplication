import { Component, OnInit } from '@angular/core';
import { GridDataService } from '../_services/grid-data.service';
import { LeaveService } from '../_services/leave.service';
import { LogInService } from '../_services/log-in.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  employeeData:any = [];
  employeeTempData:any = [];
  isSearched : boolean = false;
  currentUser:any = {};
  employeeDetailsForModal: any = {};

  constructor(private leaveService:LeaveService, private loginService:LogInService) {
    this.getLeavesData();
   }

  ngOnInit(): void {

    this.loginService.currentUser$.subscribe((res:any) => {
      this.currentUser = res;
    })
  }

  getLeavesData(){
    this.leaveService.getLeaves().subscribe((res:any) => {
      const leaveData = []
      for(const key in res){
        if(res[key].employeeName === this.currentUser.username ){
          leaveData.push(res[key]);
        }
      }
      console.log(leaveData);
      this.employeeData = leaveData;
    })
  }
  
  changeStatus(status:string, id:any){
    let employee = this.employeeData.find((e: { id: any; }) => e.id == id);
    console.log(employee);
    if(employee) employee.status = status;
}

searchEmployee(searchTerm:string){
    
  let emp:any = []
  if(searchTerm === "") return;
  if(this.isSearched) this.employeeData=this.employeeTempData;
  this.isSearched = true;
  this.employeeData.forEach((element: any) => {
    if(element.status.includes(searchTerm)) emp.push(element);
  });
  this.employeeTempData = this.employeeData;
  this.employeeData = emp;
  console.log(emp)
}

clearSearch()
{
  this.isSearched = false;
  this.employeeData = this.employeeTempData;
}



getEmployeeForModal(id:any){
  console.log(id);
  if(id === '') return;

  this.employeeDetailsForModal = this.employeeData.find((e: { id: any; }) => e.id == id);

  console.log(this.employeeDetailsForModal);

}

}
