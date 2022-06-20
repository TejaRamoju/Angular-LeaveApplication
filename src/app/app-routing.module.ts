import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { GridComponent } from './grid/grid.component';
import { ApplyLeavesComponent } from './Leaves/apply-leaves/apply-leaves.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StatusComponent } from './status/status.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path:'',
    component:LogInComponent,
    pathMatch:'full',
  },
  {
    path:'signup',
    component:SignUpComponent,
  },
  {
    path:'admin',
    component:GridComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'user',
    component:UserComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'status',
    component:StatusComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'leaves',
    component:ApplyLeavesComponent,
    canActivate: [AuthGuard]

  },
  {
    path:"**",
    component:LogInComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
