import { Request, Response, NextFunction } from 'express';
import * as csrftoken from 'csrf-token';
import express from "express";
import { Hydraservice } from './hydraservice';


let hydraService = new Hydraservice()

export class Consentservice {


    public getconsent(req: Request, res: Response, next: NextFunction) {
        var query = req.query;

        var challenge = query.consent_challenge;

        hydraService.getConsentRequest(challenge)
            .then(function (response) {
                if (response.skip) {
                    return hydraService.acceptConsentRequest(challenge, {
                        grant_scope: response.requested_scope,
                        grant_access_token_audience: response.requested_access_token_audience,
                    }).then(function (response) {
                        res.redirect(response.redirect_to);
                    });
                }
                csrftoken.create('generate csrf token here').then(token => {
                    const csrfvalue = token;
                    res.status(200)

                    const body = {
                        challenge: challenge,
                        scope: response.requested_scope,
                        subject: response.subject,
                        client: response.client,
                        csrfToken: csrfvalue
                    }

                    res.send(body);
                })
            }).catch(function (error) {
                next(error);
            });
    };


    public postconsent(req: Request, res: Response, next: NextFunction) {

        var challenge = req.body.challenge;
        var csrf = req.body.csrftoken;
        if (req.body.submit === 'Deny access') {
            return hydraService.rejectConsentRequest(challenge, {
                error: 'access_denied',
                error_description: 'The resource owner denied the request'
            })
                .then(function (response) {
                    res.redirect(response.redirect_to);
                })
                .catch(function (error) {
                    next(error);
                });
        }

        var grant_scope = req.body.grant_scope
        if (!Array.isArray(grant_scope)) {
            grant_scope = [grant_scope]
        }

        hydraService.getConsentRequest(challenge)
            .then(function (response) {
                return hydraService.acceptConsentRequest(challenge, {
                    grant_scope: grant_scope,
                    grant_access_token_audience: response.requested_access_token_audience,

                }).then(async (response) => {
                    var responseData = {
                        'redirectUrl': response.redirect_to
                    }
                    res.send(responseData);

                })
            })
            // This will handle any error that happens when making HTTP calls to hydra
            .catch(function (error) {
                next(error);
            });


    }


}