import { Request, Response, NextFunction } from 'express';
const request = require('request');
const cheerio = require('cheerio');

export class AuthorizationToken {


    public authorizetoken(req: Request, res: Response, next: NextFunction) {

        var queryobject = {
            code: req.body.code,
            scope: req.body.scope,
            state: req.body.state
        }

        // the url of Ory hydra service
        var url = 'http://192.168.99.100:32446/callback'

        request({ url, qs: queryobject }, function (error, response, body) {

            if (error) {
                console.error('error:', error);
            } else if (response && body) {
                let token = []
                const $ = cheerio.load(body)
                $('li').each(function () {
                    const test = $(this).html();
                    token.push(test.split(':'));
                })
                var tokenToSend = []
                token.forEach(something => {
                    const $$ = cheerio.load(something[1])
                    let token = {
                        [something[0]]: $$('code').html()
                    }
                    tokenToSend.push(token)
                })
                res.json({ 'body': tokenToSend });
            
            }
        });

    }
}