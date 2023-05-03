import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { UsersComponent } from './users/users.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    ContactComponent,
    AboutComponent],
  imports: [FormsModule, ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }

