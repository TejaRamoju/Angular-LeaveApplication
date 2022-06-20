import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LogInService } from '../_services/log-in.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() titleName: any = '';
  currentUser: any = {};

  constructor(private loginService: LogInService, private router: Router) {

  }

  ngOnInit(): void {
    this.loginService.currentUser$.subscribe((res:any) => {
    this.currentUser = res;
    })
  }

  onLogIn() {
    this.router.navigate(['/']);
  }

  onLogOut() {
    this.loginService.logout();
    this.router.navigate(['/']);
    console.log(this.currentUser)
  }
}
