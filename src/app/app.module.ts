import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { LivestreamComponent } from './livestream/livestream.component';
import { TableComponent } from './table/table.component';
import { AdminLivestreamComponent } from './admin-livestream/admin-livestream.component';
import { PlantMainpageComponent } from './plant-mainpage/plant-mainpage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { ReportGenerationComponent } from './report-generation/report-generation.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { MainBranchReportsComponent } from './main-branch-reports/main-branch-reports.component';
import { PilotDashboardComponent } from './pilot-dashboard/pilot-dashboard.component';
import { ChatComponent } from './pilot-dashboard/chat/chat.component';
import { PlantChatComponent } from './plant-mainpage/plant-chat/plant-chat.component';
import { AdminFeedbackTableComponent } from './admin-feedback-table/admin-feedback-table.component';
import { OnGoingMissionsComponent } from './mainpage/on-going-missions/on-going-missions.component';
import { AdminChangePasswordComponent } from './admin-change-password/admin-change-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AddScheduleComponent } from './pilot-dashboard/add-schedule/add-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MainpageComponent,
    LivestreamComponent,
    TableComponent,
    AdminLivestreamComponent,
    PlantMainpageComponent,
    PageNotFoundComponent,
    RegisterComponent,
    ReportGenerationComponent,
    AdminReportComponent,
    MainBranchReportsComponent,
    PilotDashboardComponent,
    ChatComponent,
    PlantChatComponent,
    AdminFeedbackTableComponent,
    OnGoingMissionsComponent,
    AdminChangePasswordComponent,
    ChangePasswordComponent,
    ScheduleComponent,
    AddScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
