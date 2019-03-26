import mongoose = require('mongoose');
import { Openidschema } from '../model/openid';
import * as jwt from 'jsonwebtoken';

const openidmodel = mongoose.model('Openid', Openidschema);

export class OpenidDao {

    public openiddao(userData, callback) {
        let logincreds = new openidmodel(userData);
        logincreds.save().then((result) => {
            callback(result);
        }).catch((error) => {
            callback(error);
        })
    }

    public getopendid(logindetails, callback) {
        openidmodel.findOne({ email: logindetails.email, password: logindetails.password }, function (err, response) {
            callback(response);
        }).catch((err) => {
            callback(err);
        })
    }

    public consentdao(consentdata, callback) {

        if (consentdata.scope === 'openid' && consentdata.submit === 'Allow access') {
            openidmodel.findById(consentdata.id).then((result) => {

                if (result.Idtoken !== '') {
                    jwt.verify(result.Idtoken, 'geppettosecret',(err,decoded) => {
                        if (err) {
                            console.log('Auth error', err);
                            callback(err);
                        } else {
                            callback(decoded);
                        }
                    })
                } else {
                    var payload = {
                        username: result.email,
                        password: result.password,
                        role: result.role
                    }
                    var token = jwt.sign(payload, 'geppettosecret', {
                        expiresIn: '1h'
                    });
                    openidmodel.findByIdAndUpdate(consentdata.id, { $set: { Idtoken: token } }, function (err, result) {
                        if (err) {
                            callback(err);
                        }
                        callback(result);
                    })
                }
            })
        }
    }
}