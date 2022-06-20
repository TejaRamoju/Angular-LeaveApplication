import { Component, OnInit } from '@angular/core';
import { LogInService } from './_services/log-in.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /**
   *
   */
  constructor(private loginService:LogInService) {
    
  }
  ngOnInit(): void {
  this.setCurrentUser();
  }

  setCurrentUser(){
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.loginService.setCurrentUser(user);
  }


  titleName = 'Jk Tech';
  updateTitle(title:any){
    debugger;
    this.titleName=this.titleName;
  }
}
