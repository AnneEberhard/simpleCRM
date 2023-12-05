import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ArchiveComponent } from './archive/archive.component';
import { ArchivedUserDetailComponent } from './archived-user-detail/archived-user-detail.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'user', component: UserComponent},
  { path: 'user/:id', component: UserDetailComponent},
  { path: 'archive', component: ArchiveComponent},
  { path: 'archived-user/:id', component: ArchivedUserDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
