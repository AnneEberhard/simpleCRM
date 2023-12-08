import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArchiveComponent } from './archive/archive.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { MemberComponent } from './member/member.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { ArchivedMemberDetailComponent } from './archived-member-detail/archived-member-detail.component';



const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'member', component: MemberComponent },
  { path: 'member/:id', component: MemberDetailComponent },
  { path: 'archive', component: ArchiveComponent},
  { path: 'archived-member/:id', component: ArchivedMemberDetailComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },  // Hier wird zuerst umgeleitet
  { path: '**', redirectTo: '/sign-in' }  // Für alle anderen nicht gefundenen Pfade wird ebenfalls umgeleitet
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
