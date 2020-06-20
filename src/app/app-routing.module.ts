import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './headquarters/mainpage/mainpage.component';
import { PlantMainpageComponent } from './client/plant-mainpage/plant-mainpage.component';
import { LivestreamComponent } from './client/livestream/livestream.component';
import { AdminLivestreamComponent } from './admin/admin-livestream/admin-livestream.component';
import { TableComponent } from './client/table/table.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './admin/register/register.component';
import { ReportGenerationComponent } from './pilot/report-generation/report-generation.component';
import { AdminReportComponent } from './admin/admin-report/admin-report.component';
import { MainBranchReportsComponent } from './headquarters/main-branch-reports/main-branch-reports.component';
import { PilotDashboardComponent } from './pilot/pilot-dashboard/pilot-dashboard.component';
import { AdminAuthGuard } from './services/admin-auth.guard';
import { BasicAuthGuard } from './services/basic-auth.guard';
import { MainbranchGuard } from './services/mainbranch.guard';
import { PilotGuard } from './services/pilot.guard';
import { AdminFeedbackTableComponent } from './admin/admin-feedback-table/admin-feedback-table.component';
import { AdminChangePasswordComponent } from './admin/admin-change-password/admin-change-password.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AddScheduleComponent } from './pilot/pilot-dashboard/add-schedule/add-schedule.component';
import { ServerStatsComponent } from './admin/server-stats/server-stats.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'password', component: ChangePasswordComponent, canActivate: [BasicAuthGuard] },

  /** Admin Routes */
  { path: 'admindashboard', component: MainpageComponent/*, canActivate: [AdminAuthGuard] */},
  { path: 'adminlivestream', component: AdminLivestreamComponent/*, canActivate: [AdminAuthGuard] */},
  { path: 'adminReport', component: AdminReportComponent, canActivate: [AdminAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AdminAuthGuard] },
  { path: 'feedback', component: AdminFeedbackTableComponent, canActivate: [AdminAuthGuard] },
  { path: 'changePassword', component: AdminChangePasswordComponent, canActivate: [AdminAuthGuard] },
  { path: 'Adminschedule', component: ScheduleComponent, canActivate: [AdminAuthGuard] },
  { path: 'server', component: ServerStatsComponent, canActivate: [AdminAuthGuard] },

  /** MainBranch Routes */
  { path: 'dashboard', component: MainpageComponent, canActivate: [MainbranchGuard] },
  { path: 'mainBranchReports', component: MainBranchReportsComponent, canActivate: [MainbranchGuard] },
  { path: 'livestream', component: AdminLivestreamComponent, canActivate: [MainbranchGuard] },
  { path: 'schedule', component: ScheduleComponent, canActivate: [MainbranchGuard] },

  /** Plant Routes */
  { path: 'plantmainpage', component: PlantMainpageComponent, canActivate: [BasicAuthGuard] },
  { path: 'plantlivestream', component: LivestreamComponent, canActivate: [BasicAuthGuard] },
  { path: 'reports', component: TableComponent, canActivate: [BasicAuthGuard] },
  { path: 'plantschedule', component: ScheduleComponent, canActivate: [BasicAuthGuard] },

  /** Pilot Routes */
  { path: 'pilotmainpage', component: PilotDashboardComponent, canActivate: [PilotGuard]},
  { path: 'reportCreate', component: ReportGenerationComponent, canActivate: [PilotGuard] },
  { path: 'pilotSchedule', component: ScheduleComponent, canActivate: [PilotGuard] },
  { path: 'addSchedule', component: AddScheduleComponent, canActivate: [PilotGuard] },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
