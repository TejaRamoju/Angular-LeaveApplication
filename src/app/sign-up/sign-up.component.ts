import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInService } from '../_services/log-in.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  admin1:boolean=false;
  signupModel:any = {username:'', password:'', confirmPassword:'',isAdmin:''}

  constructor(private loginService:LogInService, private router:Router) {

   }
   addAdmin(){
     this.signupModel.isAdmin=true
     console.log(this.signupModel.isAdmin)
   }

  ngOnInit(): void {
  }
  signUpFunction(){
    console.log(this.signupModel);
    if(this.signupModel.password === this.signupModel.confirmPassword ){
    let {confirmPassword, ...otherData} = this.signupModel; 
    this.loginService.postSignup(otherData).subscribe((res:any) => {
      console.log(res);
      this.signupModel = {username:'', password:'', confirmPassword:'',isAdmin:''};
    },
    (err) => console.log(err)
    ,
    () => {
    this.router.navigateByUrl("/")
    }
    )

  }

  }

}

