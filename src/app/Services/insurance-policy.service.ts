import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InsuracePolicy } from '../Model/InsurancePolicy';
@Injectable({
	providedIn: 'root'
})
export class InsurancePolicyService {
	private _url: string = "http://localhost:8050/";
	constructor(private http: HttpClient) { }
	getPoliciesByUserId(userId: string): Observable<InsuracePolicy[]> {
		return this.http.get<InsuracePolicy[]>(this._url + 'InsurancePoliciesByUserId/' + userId);
	}
	getAllPolices(): Observable<InsuracePolicy[]> {
		return this.http.get<InsuracePolicy[]>(this._url + 'InsurancePolicies');
	}
	postPolicy(insuracePolicy:InsuracePolicy) :Observable<InsuracePolicy>{
		return this.http.post<InsuracePolicy>(this._url+'InsurancePolicies',insuracePolicy)
	}
	getPolicyById(insuracePolicyId:string):Observable<InsuracePolicy>{
		return this.http.get<InsuracePolicy>(this._url+'InsurancePolicies/'+insuracePolicyId);
	}
	putPolicy(insuracePolicy:InsuracePolicy):Observable<InsuracePolicy>{
		return this.http.put<InsuracePolicy>(this._url+'InsurancePolicies', insuracePolicy);
	}
	deletePolicyById(insuracePolicyId:string):Observable<any>{
		return this.http.delete<any>(this._url+'InsurancePolicies/'+insuracePolicyId);
	}
}
