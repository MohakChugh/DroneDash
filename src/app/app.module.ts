import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-toggle-switch';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainpageComponent } from './headquarters/mainpage/mainpage.component';
import { LivestreamComponent } from './client/livestream/livestream.component';
import { TableComponent } from './client/table/table.component';
import { AdminLivestreamComponent } from './admin/admin-livestream/admin-livestream.component';
import { PlantMainpageComponent } from './client/plant-mainpage/plant-mainpage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './admin/register/register.component';
import { ReportGenerationComponent } from './pilot/report-generation/report-generation.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminReportComponent } from './admin/admin-report/admin-report.component';
import { MainBranchReportsComponent } from './headquarters/main-branch-reports/main-branch-reports.component';
import { PilotDashboardComponent } from './pilot/pilot-dashboard/pilot-dashboard.component';
import { ChatComponent } from './pilot/pilot-dashboard/chat/chat.component';
import { PlantChatComponent } from './client/plant-mainpage/plant-chat/plant-chat.component';
import { AdminFeedbackTableComponent } from './admin/admin-feedback-table/admin-feedback-table.component';
import { OnGoingMissionsComponent } from './headquarters/mainpage/on-going-missions/on-going-missions.component';
import { AdminChangePasswordComponent } from './admin/admin-change-password/admin-change-password.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AddScheduleComponent } from './pilot/pilot-dashboard/add-schedule/add-schedule.component';
import { ServerStatsComponent } from './admin/server-stats/server-stats.component';
import { StatsComponent } from './headquarters/mainpage/stats/stats.component';
import { FlightStatsComponent } from './admin/flight-stats/flight-stats.component';

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
    AddScheduleComponent,
    ServerStatsComponent,
    StatsComponent,
    FlightStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    UiSwitchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
