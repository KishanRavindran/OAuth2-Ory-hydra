import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LandingService } from './landingservice.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  constructor(private router: ActivatedRoute, private landingservice: LandingService) { }

  public params = {
    code: '',
    scope: '',
    state: ''
  };
  public tokens: any;
  public codes: any;
  public scopes: any;
  public states: any;

  ngOnInit() {
    // this.Queryparams();
  }

  Queryparams() {
    this.router.queryParams.subscribe(params => {
      this.codes = params['code'];
      this.scopes = params['scope'];
      this.states = params['state'];
    });

    this.params.code = this.codes;
    this.params.scope = this.scopes;
    this.params.state = this.states;

    this.landingservice.landingpage(this.params).subscribe(data => {
      this.tokens = data.body;
      sessionStorage.setItem('Tokens', JSON.stringify(this.tokens));
    }, error => {
      console.error('error:', error);
    });
  }
}
