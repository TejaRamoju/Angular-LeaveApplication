import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { LogInService } from './_services/log-in.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LogInService, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.loginService.currentUser$.pipe(
      map((user: any) => {
        if (user) return true;

        this.router.navigateByUrl('/');
        return false;
      })
    );
  }
}
