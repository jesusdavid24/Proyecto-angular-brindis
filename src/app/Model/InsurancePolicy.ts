export class InsuracePolicy {
	_id:string;
	AccountHolder:{
		firstName:string;
		lastName:string;
	};
	Beneficiaries:[{
		Name: string;
		Address:string;
		PhoneNumber:string;
		AmoutToPay:number;
	}];
	Properties:[{
		Name: string;
		Description: string;
		Value:number
	}];
	Validity:string;
	AmoutSum:number;
	AmoutPay:number;
	PaymentFrecuency:string;
	Risks:[{
		Name:string;
		Description:string;
	}]
	user:string;
}