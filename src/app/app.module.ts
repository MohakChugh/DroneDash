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
    ReportGenerationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
