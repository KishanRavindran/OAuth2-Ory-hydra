import * as fetch from 'node-fetch';

const uj = require ('url-join');
const hydraurl = 'http://localhost:4445';

export class Hydraservice {

    public get(flow, challenge) {

        console.log('----------------hydraurl------->>>', hydraurl);
        return fetch(uj(hydraurl, '/oauth2/auth/requests/' + flow + '/' + encodeURIComponent(challenge)))
            .then(function (res) {
                if (res.status < 200 || res.status > 302) {
                    return res.join().then(function (body) {
                        console.error('An error occured')
                        return Promise.reject(new Error(body.error.message))
                    })
                }
                return res.json();
            })
    }


    public put(flow, action, challenge, body) {
        return fetch(uj(hydraurl, '/oauth2/auth/requests/' + flow + '/' + encodeURIComponent(challenge) + '/' + action), {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            if (res.status < 200 || res.status > 302) {
                return res.join().then(function (body) {
                    console.error('An error occurred when making http request')
                    return Promise.reject(new Error(body.error.message))
                })
            }
            return res.json();
        });

    }


    // Fetches information on a login request.
    public getLoginRequest(challenge) {
        return this.get('login', challenge);
    }

    // Accepts a login request.
    public acceptLoginRequest(challenge, body) {
        return this.put('login', 'accept', challenge, body);
    }

    // Rejects a login request.
    public rejectLoginRequest(challenge, body) {
        return this.put('login', 'reject', challenge, body);
    }

    // Fetches information on a consent request.
    public getConsentRequest(challenge) {
        return this.get('consent', challenge);
    }

    // Accepts a consent request.
    public acceptConsentRequest(challenge, body) {
        return this.put('consent', 'accept', challenge, body);
    }

    // Rejects a consent request.
    public rejectConsentRequest(challenge, body) {
        return this.put('consent', 'reject', challenge, body);
    }
}  
