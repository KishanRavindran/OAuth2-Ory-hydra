import { Request, Response, NextFunction } from 'express';
import * as csrftoken from 'csrf-token';
import { Hydraservice } from './hydraservice';

let hydraService = new Hydraservice()

export class Loginservice {

    
    public getlogin(req: Request, res: Response, next: NextFunction) {
        // console.log('------------------req------>>>', req);
        var query = req.query;
        var challenge = query.login_challenge;
        hydraService.getLoginRequest(challenge).then(function (response) {
            if (response.skip) {
                return hydraService.acceptLoginRequest(challenge, {
                    subject: response.subject
                }).then(function (response) {
                    res.redirect(response.redirect_to);
                });
            } else {
                csrftoken.create('generate csrf token here').then(token => {
                    const csrfvalue = token;
                    res.status(200)
                    const body = {
                        challenge: challenge,
                        csrfToken: csrfvalue
                    }
                    res.send(body);
                })
            }
        }).catch(function (error) {
            next(error)
        });
    }


    public postlogin(req: Request, res: Response, next: NextFunction) {

        // console.log('-----------req---------', req.body);
        var challenge = req.body.challenge;

        if (!(req.body.username === 'admin' && req.body.password === 'T@ng3456!.')) {
            res.send('login?' + challenge);
            return;
        }

        hydraService.acceptLoginRequest(challenge, {
            subject: 'admin',
        }).then(function (response) {
            var responseData = {
                'redirectUrl': response.redirect_to
            }
            console.log('---------------redirecturl--------->>>>', responseData);

            res.status(200).json(responseData);
        }).catch(function (error) {
            next(error);
        })
    }
}