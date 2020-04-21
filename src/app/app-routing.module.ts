import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsurancePolicyListComponent } from './Components/insurance-policy-list/insurance-policy-list.component';
import { InsunrancePolicyAddOrEditComponent } from './Components/insunrance-policy-add-or-edit/insunrance-policy-add-or-edit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { ComponentsComponent } from './Components/components.component';
import { UserAddOrEditComponent } from './Components/user-add-or-edit/user-add-or-edit.component';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
	{
		path: '', component: ComponentsComponent,
		children: [
			{path: 'userList', component:UserListComponent},
			{path: 'user/:id', component:UserAddOrEditComponent},
			{path: 'user', component:UserAddOrEditComponent},
			{path: 'polizas', component:InsurancePolicyListComponent},
			{path: 'poliza/:id', component:InsunrancePolicyAddOrEditComponent},
			{path: 'poliza', component:InsunrancePolicyAddOrEditComponent},
			
			{path: '', redirectTo:'Home', pathMatch:'full'},
		]
	},
	{path: 'login', component:LoginComponent},
	{path: 'register', component:RegisterComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
