import { Request, Response, response } from 'express';
import { openidservice } from '../services/Openidservice';

let Openidservice = new openidservice;
export class Openidcontroller {

    public openid(req: Request, res: Response) {

        Openidservice.openidservice(req, (response) => {
            res.status(201);
            res.json(response);
        })
    }

    public getopenid(req: Request, res: Response) {

        Openidservice.getopenidservice(req,(response) => {
            res.status(200);
            res.json(response);
        })

    }

    public consent(req: Request, res: Response){

        Openidservice.consentservice(req, (response) => {
            res.status(201);
            res.json(response);
        })
    }
}