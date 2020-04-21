import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InsurancePolicyListComponent } from './Components/insurance-policy-list/insurance-policy-list.component';
import { HttpClientModule } from '@angular/common/http';
import { InsunrancePolicyAddOrEditComponent } from './Components/insunrance-policy-add-or-edit/insunrance-policy-add-or-edit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ComponentsComponent } from './Components/components.component';
import { UserAddOrEditComponent } from './Components/user-add-or-edit/user-add-or-edit.component';




@NgModule({
  declarations: [
    AppComponent,
    InsurancePolicyListComponent,
    InsunrancePolicyAddOrEditComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    HomeComponent,
    SidebarComponent,
    ComponentsComponent,
    UserAddOrEditComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	HttpClientModule,
	ReactiveFormsModule,
  FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
