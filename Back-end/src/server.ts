import express from "express";
import * as bodyParser from "body-parser";
import cors from 'cors';
import mongoose = require ('mongoose');
import { WinstonLogger } from './config/Winstonlogger';
import { Routes } from './routes/routes';
const request = require('request');
import { Request, Response, NextFunction } from 'express';
const cheerio = require('cheerio');
import * as csrftoken from 'csrf-token';
var base64 = require('base-64');
import { MongoConfig } from './config/Mongoconfig';


const PORT = 3010;

class App {

    public app = express();
    public csrfvalue: any;
    public Authorizationurl: any;
    public routerPrv: Routes = new Routes();
    public logger: WinstonLogger = new WinstonLogger();
    public mongourl: String = 'mongodb://127.0.0.1/kishan';

    constructor() {
        this.logger.setupLogger();
        this.logger.configureWinston(this.app);
        this.initializeMiddlewares();
        this.mongoSetup();
        this.routerPrv.routes(this.app);

    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors({ credentials: true, origin: true }))
        this.app.route('/home').get(this.homeroute);
        this.app.route('/client').post(this.clientroute);
        this.app.route('/token').post(this.tokenendpoint);

    }

    private tokenendpoint(req: Request, res: Response, next: NextFunction): void {

        var tokenurl = 'http://localhost:4444/oauth2/token'


        var tokenbody = {
            code: 'QTKp89hf-K7kd4vcLMKe86nz8Tom5oRChJuOgQbPvu4.POK56dAvRbKccTYvZ76thHT70FWLvDslcU0nRRtKns4',
            scope: 'openid offline',
            state: 'YPMJiOoI-htXuNljo_6-4IJTrBXJvO9JTGmk'
        }

        var text = 'gepclient:gepsecret'
        var encoded = base64.encode(text)

        console.log('-----------encode----------', encoded);
        var tokencontent = {
            grant_type: ['refresh_token', 'authorization_code'],
            scope: 'openid offline ',
            Authorization: encoded,
            client_id: 'gepclient',
            client_secret: 'gepsecret'

        }
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }

        const options = {
            method: 'POST',
            url: tokenurl,
            json: tokencontent,
            headers
        }
        request(options, function (error, response, body) {
            if (error) {
                console.log('error:', error);
            } else if (response && body) {
                console.log('-------->>>>', body);
            }
            res.send(body);
        })

    }


    private clientroute(req: Request, res: Response, next: NextFunction): void {
        var hydraurl = 'http://localhost:4445/clients'

        var clientbody = {
            client_id: 'gepclient',
            client_name: 'geppetto',
            client_secret: 'gepsecret',
            grant_types: ['refresh_token', 'authorization_code'],
            response_types: ['code', 'id_token'],
            scope: 'openid offline ',
            endpoint: 'http://localhost:4445',
            redirect_uris: ['http://127.0.0.1:4200/callback']
        }
        const headers = {
            'Content-Type': 'application/json', 'Accept': 'application/json'
        }

        var options = {
            method: 'POST',
            url: hydraurl,
            headers: headers,
            json: clientbody,
        }
        request(options, function (error, response, body) {
            if (error) {
                console.log('error:', error);
            } else if (response && body) {
                console.log('--------body------->>>', body);


                var nonce = require('nonce-generator');

                csrftoken.create('generate csrf token here').then(token => {
                    this.csrfvalue = token;

                    var properties = {
                        client_id: 'gepclient',
                        redirect_uri: 'http://127.0.0.1:4200/callback',
                        response_type: 'code',
                        scope: 'openid+offline',
                    }

                    this.Authorizationurl = 'http://localhost:4444/oauth2/auth?client_id=' + properties.client_id + '&redirect_uri=' + properties.redirect_uri + '&response_type=' + properties.response_type + '&scope=' + properties.scope + '&state=' + this.csrfvalue + '&nonce=' + nonce(24) + '&prompt=&max_age=0'
                    console.log('------------->>>>', this.Authorizationurl);

                });
                res.send(body);

            }
        })



    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongourl, { useNewUrlParser: true })
        // let mongoConfig = new MongoConfig();
        // mongoConfig.mongoconfig();
    }


    private homeroute(req: Request, res: Response, next: NextFunction): void {

        var url = 'http://192.168.99.100:32446';

        request({ url }, function (error, response, body) {
            if (error) {
                console.log('error:', error);
            } else if (response && body) {
                let url = [];
                const $ = cheerio.load(body)
                $('a').each(function () {
                    const test = $(this)[0];
                    const urlvalue = test.attribs;
                    url.push(urlvalue.href);
                })

                res.send(url);
            }
        })

    }
}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})