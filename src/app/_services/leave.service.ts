import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http:HttpClient) { }

  postLeave(formData:any){
   return this.http.post('https://empdata-703aa-default-rtdb.firebaseio.com/apply.json',formData);
  }

  getLeaves(){
    return this.http.get('https://empdata-703aa-default-rtdb.firebaseio.com/apply.json')
    .pipe(map((res:any) => {
        const leaveData = []
        for(const key in res){
          if(res.hasOwnProperty(key)){
            let data = {"id":key, ...res[key]};
            leaveData.push(data);
          }
        }
        return leaveData;
      } ));
  }

  changeStatus(employeeWithStatusChanged:any, id:any){
    return this.http.put(`https://empdata-703aa-default-rtdb.firebaseio.com/apply/${id}.json`, employeeWithStatusChanged);
  }

}

 // var temp = {
          // "id":key,
          // "employeeName": res[key].employeeName,
          // "jobTitle":res[key].jobTitle,
          // "city":res[key].city,
          // "connection":res[key].connection,
          // "status":res[key].status,
          // "leaveType":res[key].leaveType,
          // "leaveDays":res[key].leaveDays
          // }
  