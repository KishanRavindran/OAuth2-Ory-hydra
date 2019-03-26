import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Consentservice } from './consentservice.service';
@Component({
  selector: 'app-consentscreen',
  templateUrl: './consentscreen.component.html',
  styleUrls: ['./consentscreen.component.css']
})
export class ConsentscreenComponent implements OnInit {

  constructor(private router: ActivatedRoute, private consentservice: Consentservice, private route: Router) { }


  public openId: any;
  public offLine: any;
  public challenge: any;
  public consent: any;
  public token: any;
  public consentchallenge: any;
  // public consentbody = {
  //   // challenge: '',
  //   submit: '',
  //   grant_scope: [],
  //   // csrftoken: ''
  // };
  public id: any;

  ngOnInit() {
    // this.Queryparams();
    this.router.queryParams.subscribe(params => {
      // this.consentchallenge = params['consent_challenge'];
      this.id = params['id'];
      // this.challenge = window.location.href;
    });

  }

  Queryparams() {
    this.router.queryParams.subscribe(params => {
      this.consentchallenge = params['consent_challenge'];
      this.id = params['id'];
      this.challenge = window.location.href;
    });
    const splitvalue = this.challenge.split('?');
    this.consent = splitvalue[1];
    this.consentservice.Getconsent(this.consent).subscribe(consentdetails => {
      this.token = consentdetails.csrfToken;
    }, error => {
      console.error('error: ', error);
    });
  }

  openid(value) {
    if (value.checked === true) {
      this.openId = 'openid';
    }
  }

  offline(value) {
    if (value.checked === true) {
      this.offLine = 'offline';
    }
  }

  Consent() {
    // this.consentbody.challenge = this.consentchallenge;
    // this.consentbody.submit = 'Allow access';
    // this.consentbody.grant_scope = [this.openId, this.offLine];
    // this.consentbody.csrftoken = this.token;
    const consentbody = {
      submit: 'Allow access',
      scope: this.openId,
      id: this.id,
    };
    this.consentservice.Consent(consentbody).subscribe(consentvalue => {
      // const redirecturi = consentvalue.redirectUrl;
      // const re = /localhost/;
      // const url = redirecturi.replace(re, '192.168.99.100');
      // window.open(redirecturi, '_self');
      console.log('--------consentvalue------>>', consentvalue);
      this.route.navigate(['callback']);

    }, error => {
      console.error('error: ', error);
    });
  }
}
