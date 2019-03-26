import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apiservice } from '../Config/api.service';
import { Router } from '@angular/router';
import { Sharedservice } from '../Sharedservice/sharedservice';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router, private apiservice: Apiservice, private restapi: Sharedservice) { }


  Getlogin(loginchallenge: any): Observable<any> {
    return this.apiservice.get(this.restapi.baseurl + '/login' , loginchallenge);
  }

  Login(user: any): Observable<any> {
    return this.apiservice.post(this.restapi.baseurl + '/login' , user);
  }
}
