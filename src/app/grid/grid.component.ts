import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridDataService } from '../_services/grid-data.service';
import { LeaveService } from '../_services/leave.service';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  employeeData:any = [];
  employeeTempData:any = [];
  searchTerm:any = "";
  isSearched : boolean = false;
  countApprove: number = 0;
  countRejected: number = 0;
  countPending: number = 0;
  employeeDetailsForModal: any = {};
  isLoading:boolean = false;


  
  constructor(private gridDataService:GridDataService, private leaveService:LeaveService) {
    // console.log(data);
    // this.employeeData = gridDataService.getEmployees();
  }
  

  ngOnInit(): void {
    

    this.getLeavesData();

    
    // console.log(this.countApprove,this.countRejected, this.countPending )
  }

  getLeavesData(){
    this.isLoading = true;
    this.leaveService.getLeaves().subscribe((res:any) => {
      console.log(res);
      this.employeeData = res;
      },

    (errors:any) =>{console.log(errors)},
    
    ()=>{
      this.employeeData.forEach((element: any) => {
        if(element.status.includes("Approved")) this.countApprove += 1 ;
        if(element.status.includes("Rejected")) this.countRejected += 1 ;
        if(element.status.includes("Pending")) this.countPending += 1 ;
        this.isLoading = false;
      });
      
    })

  }

  changeStatus(status:string, Id:any){
      let employee = this.employeeData.find((e: { id: any; }) => e.id == Id);
      // console.log(employee);
      let currentStatus = "";
      if(employee){
        currentStatus = employee.status;
        employee.status = status;
      } 
      

      if(status == "Approved" && currentStatus == "Pending")
      {
        
        this.countApprove = this.countApprove+1;
        if(this.countPending > 0)this.countPending = this.countPending-1;
      }

      if(status == "Rejected" && currentStatus == "Pending")
      {
        this.countRejected = this.countRejected+1;
        if(this.countPending > 0)this.countPending = this.countPending-1;
      }

      if(status == "Approved" && currentStatus == "Rejected")
      {
        
        this.countApprove ++;
        this.countRejected --;
      }

      if(status == "Rejected" && currentStatus == "Approved")
      {
        
        this.countApprove --;
        this.countRejected ++;
      }

      const {id, ...otherDetails} = employee;
      
      this.leaveService.changeStatus(otherDetails,Id).subscribe(res=>console.log(res));

  }


  searchEmployee(){
    
    let emp:any = []
    if(this.searchTerm === "" ) return;

    this.isSearched = true;
    this.employeeData.forEach((element: any) => {
      if(element.employeeName.toLowerCase().includes(this.searchTerm.toLowerCase())) emp.push(element);
      if(element.jobTitle.toLowerCase().includes(this.searchTerm.toLowerCase())) emp.push(element);
      if(element.city.toLowerCase().includes(this.searchTerm.toLowerCase())) emp.push(element);
      if(element.connection.toLowerCase().includes(this.searchTerm.toLowerCase())) emp.push(element);
      if(element.status.toLowerCase().includes(this.searchTerm.toLowerCase())) emp.push(element);
    });
    this.employeeTempData = this.employeeData;
    this.employeeData = emp;
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

  searchEmployee1(searchTerm:string){
    
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
  

}
