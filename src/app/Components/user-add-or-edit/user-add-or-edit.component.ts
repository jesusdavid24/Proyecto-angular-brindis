import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../Model/Users';
import { UserService } from '../../Services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from'sweetalert2';


@Component({
  selector: 'app-user-add-or-edit',
  templateUrl: './user-add-or-edit.component.html',
  styleUrls: ['./user-add-or-edit.component.css']
})
export class UserAddOrEditComponent implements OnInit {

  UserForm: FormGroup;
  user: User = new User();
  id: string;
  private emailPattern = "^[a-z0-9]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private us: UserService, 	private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(x =>
			this.id = x['id']
		);
		if(this.id){
			this.initWithData();
		}
		else {
			this.init();	
		}
   }

  ngOnInit() {
		this.UserForm = this.createFormGroup();
	}
	createFormGroup() {
		return new FormGroup({
			name: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      isAdmin: new FormControl('')
		})
  }
  

	EditOrCreateUser() {
		this.user = {
			_id: '',
			Name: this.UserForm.value.name,
			Email: this.UserForm.value.email,
			Password: this.UserForm.value.password,
			IsAdmin: this.UserForm.value.isAdmin
		}
		if (this.UserForm.valid) {
			if (this.id) {
				this.us.putUser(this.UserForm.value).subscribe(
					data =>{
						console.log(data);
					}
				)
			} else {
				
				this.us.Register(this.user).subscribe(
					data =>{
						console.log(data);
						swal.fire('Registro Correcto', '' , 'success').then(x => {
							this.router.navigate(['/userList'])
						})
					}
				)
			}
		}
  }
  
	init() {
		this.user = {
      Name: '',
      Email: '',
      Password: '',
      IsAdmin: false,
			_id:""
		}
	}
	initWithData(){
		this.us.getUseById(this.id).subscribe(data =>{
			this.user = {
				_id:data._id,
        Name: data.Name, 
        Email: data.Email,
        Password: data.Password,
        IsAdmin: data.IsAdmin
        
				}
		});
  }
  


	get name() {
		return this.UserForm.get('name');
	}
	get email() {
		return this.UserForm.get('email');
	}
	get password() {
		return this.UserForm.get('password');
	}
	get isAdmin() {
		return this.UserForm.get('isAdmin');
	}

}
