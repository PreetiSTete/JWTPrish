import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  //{path:'', redirectTo:'users', pathMatch:'full'},
  {path:'dashboard/users', component:DashboardComponent},
  {path:'/users', component:UsersComponent},
   {path:'/about', component:AboutComponent},
   {path:'/contact', component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
