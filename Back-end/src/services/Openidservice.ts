import { Request, response } from 'express';
import { OpenidDao } from '../daos/OpenidDao';

let openid = new OpenidDao();
export class openidservice {

    public openidservice(req: Request, callback) {
        const users = req.body;
        openid.openiddao(users, (response) => {
            callback(response);
        });
    }

    public getopenidservice(req: Request, callback) {
        const logindetails = req.body;
        openid.getopendid(logindetails, (response) => {
            callback(response)
        });
    }

    public consentservice(req:Request, callback){
        const consentbody = req.body;

        openid.consentdao(consentbody, (response) => {
            callback(response);
        });

    }
}