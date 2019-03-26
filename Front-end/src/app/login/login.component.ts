import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './loginservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: Router, private router: ActivatedRoute, private loginservice: LoginService) { }

  public challenge: any;
  public loginchallenge: any;
  public login: any;
  public user = {
    email: '',
    password: '',
  };
  public token: any;
  public href: any;
  ngOnInit() {
    // this.Queryparams();
  }


  Queryparams() {
    this.router.queryParams.subscribe(params => {
      this.loginchallenge = params['login_challenge'];
      this.challenge = window.location.href;
      this.login = {
        'login_challenge': this.challenge
      };
      const splitvalue = this.challenge.split('?');
      this.login = splitvalue[1];
      this.loginservice.Getlogin(this.login).subscribe(token => {
        this.token = token.csrftoken;
      }, error => {
        console.error('error: ', error);
      });
    });
  }

  Login(value) {
    // this.user.challenge = this.loginchallenge;
    // this.user.csrftoken = this.token;
    // console.log('----------->>>>users--', this.user);
    this.loginservice.Login(this.user).subscribe(logindetails => {
      // console.log('------------loginresponse----->>>>', logindetails);
      // const redirecturi = logindetails.redirectUrl;
      // const re = /localhost/;
      // const url = redirecturi.replace(re, '192.168.99.100');
      // window.open(redirecturi, '_self');
      if (logindetails.Idtoken === null || logindetails.Idtoken === '') {
        this.route.navigate(['consent'], { queryParams: { id: logindetails._id } });
      } else {
        this.route.navigate(['callback']);
      }
    }, error => {
      console.error('error: ', error);
    });

  }
}
