import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamProfileComponent } from './team-profile.component';

const userRoutes: Routes = [
{ path: 'personal',
  component: TeamProfileComponent,
  children: [
  ]
},
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TeamRoutingModule { }
