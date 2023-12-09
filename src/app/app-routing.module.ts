import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArchiveComponent } from './archive/archive.component';

import { MemberComponent } from './member/member.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { ArchivedMemberDetailComponent } from './archived-member-detail/archived-member-detail.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'member', component: MemberComponent },
  { path: 'member/:id', component: MemberDetailComponent },
  { path: 'archive', component: ArchiveComponent},
  { path: 'archived-member/:id', component: ArchivedMemberDetailComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },  
  { path: '**', redirectTo: '/sign-in' }  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
