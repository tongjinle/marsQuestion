import * as express from "express";
import * as session from 'express-session';
import  UserCache from './userCache';
import UserQuery from '../logic/userQuery';



let cache:UserCache = new UserCache();
let query :UserQuery  = new UserQuery();

let route = (app: express.Application) => {

    



    app.post('/login', (req: express.Request, res: express.Response) => {
        let {username, password} = req['body'];

        query.findUser(username,password).then((data)=>{
            if(!data.length){
                res.json({flag:false});
                return;
            }
            let token = cache.add(username);
            res.json({
                flag:true,
                token
            });
            
            
        });

        // let username = req.query['username'];
        // let from = parseInt(req.query['from']);
        // let to = parseInt(req.query['to']);

        // query.findHist(username, from, to).exec((err, data) => {
        //     res.json({
        //         flag: true,
        //         data
        //     });
        // });
    });
};


export let userRoute = route;