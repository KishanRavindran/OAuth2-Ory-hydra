import { Request, Response, NextFunction } from 'express';
import { Loginservice } from '../services/loginservice';
import { Consentservice } from '../services/consentservice';
import { AuthorizationToken } from '../services/redirecttoken';
import { Openidcontroller } from '../controllers/Openidcontroller';

export class Routes {

    public loginservice: Loginservice = new Loginservice()

    public openidcontroller: Openidcontroller = new Openidcontroller();

    public consentservice: Consentservice = new Consentservice()

    public authorize: AuthorizationToken = new AuthorizationToken()

    public routes(app): void {

        // Login get and post call
        // app.route('/login').get(this.loginservice.getlogin);
        // app.route('/login').post(this.loginservice.postlogin);

        // Consent get and post call
        // app.route('/consent').get(this.consentservice.getconsent);
        // app.route('/consent').post(this.consentservice.postconsent);

        // Authorization token
        app.route('/authorize').post(this.authorize.authorizetoken);

        app.route('/signup').post(this.openidcontroller.openid);
        app.route('/login').post(this.openidcontroller.getopenid);

        app.route('/consent').post(this.openidcontroller.consent);
        
    }
}