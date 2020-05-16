import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { PlantMainpageComponent } from './plant-mainpage/plant-mainpage.component';
import { LivestreamComponent } from './livestream/livestream.component';
import { AdminLivestreamComponent } from './admin-livestream/admin-livestream.component';
import { TableComponent } from './table/table.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admindashboard', component: MainpageComponent },
  { path: 'plantmainpage', component: PlantMainpageComponent },
  { path: 'plantlivestream', component: LivestreamComponent },
  { path: 'adminlivestream', component: AdminLivestreamComponent },
  { path: 'reports', component: TableComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
