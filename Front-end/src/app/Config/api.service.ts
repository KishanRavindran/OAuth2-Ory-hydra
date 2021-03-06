import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class Apiservice {

    constructor(private http: HttpClient) { }

    private setHeaders(): HttpHeaders {
        const headersconfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        return new HttpHeaders(headersconfig);
    }

    private formatErrors(httpresponse: any) {
        return throwError('Http error from the service side');
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${path}`,
            {
                params
            }
        ).pipe(catchError(this.formatErrors));
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http.post(`${path}`,
            JSON.stringify(body), {
                headers: this.setHeaders(),
            }
        )
            .pipe(catchError(this.formatErrors));
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.http.put(`${path}`,
            JSON.stringify(body)
        )
            .pipe(catchError(this.formatErrors));
    }

}
