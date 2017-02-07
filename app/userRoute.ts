import * as express from "express";
import * as session from 'express-session';
import userCache from './userCache';
import UserQuery from '../logic/userQuery';



let cache = userCache;
let query: UserQuery = new UserQuery();

let route = (app: express.Application) => {
    // login
    app.post('/stud/login', (req: express.Request, res: express.Response) => {
        let {username, password} = req['body'];

        query.findUser(username).then((data) => {
            if (!data || data['password']!=password) {
                res.json({ flag: false });
                return;
            }
            let token = cache.add(username);
            res.json({
                flag: true,
                token
            });
        });
    });

    // edit pwd
    app.post('/stud/editPwd', (req: express.Request, res: express.Response) => {
        let { lastPassword, currPassword} = req['body'];
        let token = req.headers['token'];
        let username = userCache.getUsername(token);

        editPwd(username, lastPassword, currPassword)
            .then(data => {
                res.json({ flag: data });
            });



    });

    // getClassList
    app.get('/common/classList', (req: express.Request, res: express.Response) => {
        query.getClassList()
            .then(data => {
                res.json({ classList: data });
            });
    });

    // getStudListByClass
    app.get('/common/studListByClass', (req: express.Request, res: express.Response) => {
        let klass = req.query.class;
        query.getStudListByClass(klass)
            .then(data => res.json({ usernameList: data.map(d=>d['username']) }));
    });


    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////


    async function editPwd(username: string, lastPassword: string, currPassword: string) {
        let us = await query.findUser(username);
        if (!us ||us['password']!=lastPassword) {
            return new Promise(r => r(false));
        }
        await query.editPwd(username, currPassword);
        return new Promise(r => r(true));
    }

};


export let userRoute = route;