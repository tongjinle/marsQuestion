import * as express from "express";
import * as session from 'express-session';
import userCache from './userCache';
import TrainQuery from '../logic/trainQuery';



let cache = userCache;
let query: TrainQuery = new TrainQuery();

let route = (app: express.Application) => {
    // getQuesList
    app.get('/stud/quesList', (req: express.Request, res: express.Response) => {
        let {username, password} = req['body'];

        
    });

    // getQuesDetail
    app.get('/stud/quesDetail', (req: express.Request, res: express.Response) => {
        let { name} = req.query;
        let token = req.headers['token'];
        let username = userCache.getUsername(token);

        getQuesDetail(username,name)
        .then(data=>{
            if(data['flag']){
                res.json(data['detail']);
            }else{
                res.json(undefined);
            }
        })



    });

    // commitCode
    app.get('/common/classList', (req: express.Request, res: express.Response) => {
       
    });

   


    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////


    async function getQuesDetail(username: string, quesname:string) {
        let quesDetailDoc = await query.getQuesDetail(quesname);
        if (!quesDetailDoc) {
            return new Promise(r => r({flag:false,err:'no such question'}));
        }
        let quesDetail = quesDetailDoc.toObject();
        
        let anDetailDoc = await query.getAnswerDetail(quesname,username);
        let anDetail = anDetailDoc? anDetailDoc.toObject():{
            code:'',
            isPass:false,
            speed:-1
        };

        let detail ={
            name:quesname,
            desc:quesDetail['desc'],
            diff:quesDetail['diff'],
            demoInput:quesDetail['demoInput'],
            demoOutput:quesDetail['demoOutput'],
            code:anDetail['code'],
            isPass:anDetail['isPass'],
            speed:anDetail['speed']
        };
        console.log(detail);
        return new Promise(r => r({flag:true,detail}));
    }

};


export let trainRoute = route;