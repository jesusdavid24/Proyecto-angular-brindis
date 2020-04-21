import { Component, OnInit } from '@angular/core';
import { InsurancePolicyService } from '../../Services/insurance-policy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InsuracePolicy } from '../../Model/InsurancePolicy';
import swal from'sweetalert2';

@Component({
	selector: 'app-insunrance-policy-add-or-edit',
	templateUrl: './insunrance-policy-add-or-edit.component.html',
	styleUrls: ['./insunrance-policy-add-or-edit.component.css']
})
export class InsunrancePolicyAddOrEditComponent implements OnInit {


	id: string;
	InsunrancePolicyForm: FormGroup;
	insunrancePolicy: InsuracePolicy = new InsuracePolicy();
	constructor(
		private policiesServie: InsurancePolicyService,
		private route: ActivatedRoute,
		private router:Router
	) {
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
		this.InsunrancePolicyForm = this.createFormGroup();
	}
	createFormGroup() {
		return new FormGroup({
			FirstName: new FormControl("", [Validators.required,]),
			LastName: new FormControl("", [Validators.required,]),
			BeneficiarieName: new FormControl("", [Validators.required,]),
			BeneficiarieAddress: new FormControl("", [Validators.required,]),
			BeneficiariePhoneNumber: new FormControl("", [Validators.required,]),
			BeneficiarieAmoutToPay: new FormControl(1, [Validators.required]),
			PropertiesName: new FormControl("", [Validators.required,]),
			PropertiesDescription: new FormControl("", [Validators.required,]),
			PropertiesValue: new FormControl(1, [Validators.required,]),
			Validity: new FormControl("", [Validators.required,]),
			AmoutPay: new FormControl(1, [Validators.required,Validators.min(1)]),
			RiskName: new FormControl("", [Validators.required,]),
			RiskDescription: new FormControl("", [Validators.required,]),
		})
	}
	EditOrCreateRoom() {
		this.insunrancePolicy.AmoutSum = this.insunrancePolicy.Properties[0].Value;
		if (this.InsunrancePolicyForm.valid) {
			if (this.id) {
				console.log(this.insunrancePolicy);
				this.policiesServie.putPolicy(this.insunrancePolicy).subscribe(
					data =>{
						console.log(data);
					}
				)
			} else {
				console.log(this.insunrancePolicy);	
				this.policiesServie.postPolicy(this.insunrancePolicy).subscribe(
					data =>{
						console.log(data);
						swal.fire('Registro Correcto', '' , 'success').then(x => {
							this.router.navigate(['/polizas'])
						})
						
					}
				)
			}
		}
	}
	init() {
		this.insunrancePolicy = {
			AccountHolder: {
				firstName: '',
				lastName: ''
			},
			Beneficiaries: [
				{
					Name: '',
					Address: '',
					PhoneNumber: '',
					AmoutToPay: 0
				}
			],
			Properties: [
				{
					Name: '',
					Description: '',
					Value: 0
				}
			],
			Validity: 'Mensual',
			AmoutSum: 1,
			AmoutPay: 1,
			PaymentFrecuency: 'Semanal',
			Risks: [
				{
					Name: '',
					Description:''
				}
			],
			user:localStorage.getItem('UserId'),
			_id:""
		}
	}
	initWithData(){
		this.policiesServie.getPolicyById(this.id).subscribe(data =>{
			this.insunrancePolicy = {
				_id:data._id,
				AccountHolder: {
					firstName: data.AccountHolder.firstName,
					lastName: data.AccountHolder.lastName
				},
				Beneficiaries: [
					{
						Name: data.Beneficiaries[0].Name,
						Address: data.Beneficiaries[0].Address,
						PhoneNumber: data.Beneficiaries[0].PhoneNumber,
						AmoutToPay: data.Beneficiaries[0].AmoutToPay
					}
				],
				Properties: [
					{
						Name: data.Properties[0].Name,
						Description: data.Properties[0].Description,
						Value: data.Properties[0].Value
					}
				],
				Validity: data.Validity,
				AmoutSum: data.AmoutSum,
				AmoutPay: data.AmoutPay,
				PaymentFrecuency: data.PaymentFrecuency,
				Risks: [
					{
						Name: data.Risks[0].Name,
						Description:data.Risks[0].Description
					}
				],
				user:localStorage.getItem('UserId')
			}
		});
	}
	get firstName() {
		return this.InsunrancePolicyForm.get('FirstName');
	}
	get lastName() {
		return this.InsunrancePolicyForm.get('LastName');
	}
	get beneficiarieName() {
		return this.InsunrancePolicyForm.get('BeneficiarieName');
	}
	get beneficiarieAddress() {
		return this.InsunrancePolicyForm.get('BeneficiarieAddress');
	}
	get beneficiariePhoneNumber() {
		return this.InsunrancePolicyForm.get('BeneficiariePhoneNumber');
	}
	get beneficiarieAmoutToPay() {
		return this.InsunrancePolicyForm.get('BeneficiarieAmoutToPay');
	}
	get propertiesName() {
		return this.InsunrancePolicyForm.get('PropertiesName');
	}
	get propertiesDescription() {
		return this.InsunrancePolicyForm.get('PropertiesDescription');
	}
	get propertiesValue() {
		return this.InsunrancePolicyForm.get('PropertiesValue');
	}
	get validity() {
		return this.InsunrancePolicyForm.get('Validity');
	}
	get amoutPay() {
		return this.InsunrancePolicyForm.get('AmoutPay');
	}
	get riskName() {
		return this.InsunrancePolicyForm.get('RiskName');
	}
	get riskDescription() {
		return this.InsunrancePolicyForm.get('RiskDescription');
	}
}
