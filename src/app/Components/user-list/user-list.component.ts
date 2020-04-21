import { Component, OnInit } from '@angular/core';

import { User } from '../../Model/Users';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
	id: string;
	admin: User = new User();
	users: User[] = [];
	constructor(
		private userServices: UserService,
		private router: Router
	) {
		this.id = localStorage.getItem('UserId');
		// this.admin._id = this.id;
		this.admin.IsAdmin = JSON.parse(localStorage.getItem('IsAdmin'));
	}

	ngOnInit() {
		if (!this.admin.IsAdmin) {
			this.router.navigate(['/Polizas']);
		}

		this.userServices.getUsers().subscribe(
			data => {
				data.forEach(element => {
					if(this.id != element._id){
						this.users = data;
					}
				});
			});
	}
	deleteUser(id: string) {
		console.log(id);
		this.userServices.deteleUserById(id).subscribe(data => {
			if (data) {
				alert('Usuario eliminado');
				this.ngOnInit();
			}
		});
	}

}
