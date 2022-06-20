import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInService } from '../_services/log-in.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  loginModel: any = { username: '', password: '' };
  signupModel: any = { username: '', password: '', confirmPassword: '' };
  user:any = {};

  constructor(private loginService: LogInService, private router: Router) {}

  ngOnInit(): void {
    this.isUserPresent();
    
  }
  
  

  addLogIn() {
    console.log(this.loginModel);

    this.loginService.getLogIn(this.loginModel).subscribe(
      (res) => {
        if (!res) {
          console.log('Invalid Credentials');
          alert('Invalid Credentials');
          return;
        }

        // subscribing the current user object 
        this.isUserPresent();
      },
      (err) => console.log(err)
    
    );
  }

  isUserPresent(){
    this.loginService.currentUser$.subscribe((user:any) => {
      this.user = user;
      if(user.isAdmin === true){
        this.router.navigateByUrl("admin");
      } else{
        this.router.navigateByUrl("status");
      }
    })
  }
}
