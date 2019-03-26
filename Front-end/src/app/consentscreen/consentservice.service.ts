import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apiservice } from '../Config/api.service';
import { Router } from '@angular/router';
import { Sharedservice } from '../Sharedservice/sharedservice';

@Injectable({
  providedIn: 'root'
})
export class Consentservice {

  constructor(private http: HttpClient, private router: Router, private apiservice: Apiservice, private restapi: Sharedservice) { }

  Getconsent(consentchallenge: any): Observable<any> {
    return this.apiservice.get(this.restapi.baseurl + '/consent?' + consentchallenge);
  }

  Consent(consent: any): Observable<any> {
    return this.apiservice.post(this.restapi.baseurl + '/consent' , consent);
  }
}
