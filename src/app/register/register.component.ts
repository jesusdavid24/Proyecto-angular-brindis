import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../Model/Users';
import { UserService } from '../Services/user.service';
import { isNullOrUndefined } from 'util';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	private emailPattern = "^[a-z0-9]+@[a-z0-9.-]+\.[a-z]{2,4}$";
	user: User;
	errorPassword;
	error;
	CreateFormGroup() {
		return new FormGroup({
			name: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
			password: new FormControl('', [Validators.required, Validators.minLength(8)]),
			passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)]),
		})
	};
	registerForm: FormGroup;
	constructor(private userService:UserService) {
		this.registerForm = this.CreateFormGroup();
	 }

	CheckPassword(e){
		console.log(e);
		debugger
		if(!isNullOrUndefined(this.passwordConfirm.value != '' && this.password.value != '')){
			if(e.srcElement.value != this.password.value){
				this.errorPassword ="Las contraseñas no coinciden"
				return;
			}
		}
	} 

	ngOnInit() {
	}
	register() {

		if(this.registerForm.valid){
			console.log(this.registerForm.value);
		
		this.user = {
			_id:"",
			Name: this.registerForm.value.name,
			Email :this.registerForm.value.email,
			Password: this.registerForm.value.password,
		    IsAdmin:false
		}
		console.log(this.user);
		this.userService.Register(this.user).subscribe(res => {
			if(res != null)
			{
				localStorage.setItem('UserId', res._id);
			}
			else {
				this.error = "Contraseña o usuarios incorrectos"
			}
		}, err => {
			console.log(err)
			this.error = err.error;
		});
		}else{
			this.error = 'Formulario incorrecto';
		}
	}

	get name() { return this.registerForm.get('name')};
	get email() { return this.registerForm.get('email') };
	get password() { return this.registerForm.get('password') };
	get passwordConfirm() { return this.registerForm.get('passwordConfirm') };
}
