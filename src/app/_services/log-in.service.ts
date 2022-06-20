import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogInService {
  isAuth: boolean = false;
  private currentUserSource = new ReplaySubject(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  getLogIn(logInData: any) {
    
    return this.http
      .get('https://empdata-703aa-default-rtdb.firebaseio.com/Employees.json')
      .pipe(
        map((res: any) => {
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              if (
                res[key].username === logInData.username &&
                res[key].password === logInData.password
              ){
                this.setCurrentUser({ id: key, ...res[key] });
                return { id: key, ...res[key] };
              }
            }
          }
        })
      );
  }

  postSignup(signupData: any) {
    return this.http.post(
      'https://empdata-703aa-default-rtdb.firebaseio.com/Employees.json',
      signupData
    );
  }

  setCurrentUser(userData:any){
    let {password, ...otherDetails} = userData;
    localStorage.setItem("currentUser",JSON.stringify(otherDetails));
    this.currentUserSource.next(userData);
  }

  logout(){
    localStorage.removeItem("currentUser");
    this.currentUserSource.next(null);
  }
}
