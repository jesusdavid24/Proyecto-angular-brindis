import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { InsuracePolicy } from '../../Model/InsurancePolicy';
import { User } from '../../Model/Users';
import { ThrowStmt } from '@angular/compiler';
import { InsurancePolicyService } from 'src/app/Services/insurance-policy.service';

@Component({
	selector: 'app-insurance-policy-list',
	templateUrl: './insurance-policy-list.component.html',
	styleUrls: ['./insurance-policy-list.component.css']
})
export class InsurancePolicyListComponent implements OnInit {


	id: string;
	insurancePolicies: InsuracePolicy[] = [];
	user: User = new User();
	constructor(
		private policiesServie: InsurancePolicyService,
	) {
		this.id = localStorage.getItem('UserId');
		this.user._id = this.id;
		this.user.IsAdmin = JSON.parse(localStorage.getItem('IsAdmin'));
	}

	ngOnInit() {
		debugger
		if (!this.user.IsAdmin) {
			this.policiesServie.getPoliciesByUserId(this.id).subscribe(
				data => {
					this.insurancePolicies = data;
					console.log(data);
				}
			)
		} else {
			this.policiesServie.getAllPolices().subscribe(
				data => {
					this.insurancePolicies = data;
					console.log(data);
				}
			)
		}
	}
	deletePolicy(id: string) {
		console.log(id);
		this.policiesServie.deletePolicyById(id).subscribe(data => {
			if (data) {
				alert('Poliza eliminada');
				this.ngOnInit();
			}
		});
	}

}
