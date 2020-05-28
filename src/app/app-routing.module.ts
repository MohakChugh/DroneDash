import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { PlantMainpageComponent } from './plant-mainpage/plant-mainpage.component';
import { LivestreamComponent } from './livestream/livestream.component';
import { AdminLivestreamComponent } from './admin-livestream/admin-livestream.component';
import { TableComponent } from './table/table.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { BasicAuthGuard } from './basic-auth.guard';
import { RegisterComponent } from './register/register.component';
import { ReportGenerationComponent } from './report-generation/report-generation.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { MainbranchGuard } from './mainbranch.guard';
import { MainBranchReportsComponent } from './main-branch-reports/main-branch-reports.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AdminAuthGuard] },

  { path: 'admindashboard', component: MainpageComponent/*, canActivate: [AdminAuthGuard]*/ },
  { path: 'adminlivestream', component: AdminLivestreamComponent/*, canActivate: [AdminAuthGuard] */},
  { path: 'adminReport', component: AdminReportComponent/*, canActivate: [AdminAuthGuard] */},

  { path: 'dashboard', component: MainpageComponent, canActivate: [MainbranchGuard] },
  { path: 'mainBranchReports', component: MainBranchReportsComponent, canActivate: [MainbranchGuard] },
  { path: 'livestream', component: AdminLivestreamComponent, canActivate: [MainbranchGuard] },

  { path: 'plantmainpage', component: PlantMainpageComponent, canActivate: [BasicAuthGuard] },
  { path: 'plantlivestream', component: LivestreamComponent, canActivate: [BasicAuthGuard] },
  { path: 'reports', component: TableComponent, canActivate: [BasicAuthGuard] },
  { path: 'reportCreate', component: ReportGenerationComponent, canActivate: [BasicAuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
