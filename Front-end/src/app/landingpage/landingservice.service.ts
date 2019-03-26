import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apiservice } from '../Config/api.service';
import { Sharedservice } from '../Sharedservice/sharedservice';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(private http: HttpClient, private api: Apiservice, private restapi: Sharedservice) { }


  landingpage(body): Observable<any> {
    return this.api.post(this.restapi.baseurl + '/authorize', body);
  }
}
