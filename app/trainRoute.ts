import * as express from "express";
import * as session from 'express-session';
import userCache from './userCache';
import TrainQuery from '../logic/trainQuery';



let cache = userCache;
let query: TrainQuery = new TrainQuery();

let route = (app: express.Application) => {
    // getQuesList
    app.get('/stud/quesList', (req: express.Request, res: express.Response) => {
        let { diff, isFilterPass, pageIndex, pageSize} = req.query;
        let token = req.headers['token'];
        let username = userCache.getUsername(token);
        // 
        isFilterPass = !!(isFilterPass - 0);
        pageIndex = pageIndex -0;
        pageSize = pageSize -0;


        console.log({ isFilterPass });
        let data = getQuesList(diff, pageIndex, pageSize, username, isFilterPass)
            .then(data => {
                res.json(data);
            });


    });

    // getQuesDetail
    app.get('/stud/quesDetail', (req: express.Request, res: express.Response) => {
        let { name} = req.query;
        let token = req.headers['token'];
        let username = userCache.getUsername(token);

        getQuesDetail(username, name)
            .then(data => {
                if (data['flag']) {
                    res.json(data['detail']);
                } else {
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
    async function getQuesList(diff: number, pageIndex: number, pageSize: number, username: string, isFilterPass: boolean) {
        let quesListQuery = query.getQuesList(diff);

        if (isFilterPass) {
            let anList = (await query.getAnList(username)
                .select('quesname isPass')
                .exec())
                .map(doc => doc.toObject()['quesname']);

            console.log({ anList });

            quesListQuery = quesListQuery.find({ name: { $nin: anList } });
        }


        let quesList = await quesListQuery
            .skip(pageIndex * pageSize)
            .limit(pageSize)
            ;
        let totalCount = await quesListQuery.count();

        let data:any[];
        // isPass
        if(!isFilterPass){
            let anPassList = await query.getAnList(username)
                .find({quesname:{$in:quesList.map(qu=>qu['name'])}});
            data = quesList.map(qu=>{
                let anp= anPassList.find(anp=>anp['quesname']== qu['name']);
                let isPass = anp ? anp['isPass'] : false;

                return {
                    name:qu['name'],
                    diff:qu['diff'],
                    isPass
                };
            });
        }else {
            data = quesList.map(qu=>{
                return {
                    name:qu['name'],
                    diff:qu['diff'],
                    isPass:false
                };
            });
        }

        // rightCount , totalCount
        let quesnameList = quesList.map(qu=>qu['name']);
        // console.log({quesnameList});
        let rightCountList = await query.getAnCount(quesnameList,true);
        let totalCountList = await query.getAnCount(quesnameList);
        // console.log(rightCountList,totalCountList);
        
        data.forEach(d=>{
            let quesname = d['name'];
           
            let rightItem = rightCountList.find(n=>n['_id']['quesname']==quesname);
            d['rightCount'] = rightItem ?rightItem['count'] :0;

            let totalItem = totalCountList.find(n=>n['_id']['quesname']==quesname);
            d['totalCount'] = totalItem?totalItem['count']:0;
        });

        // console.log({data,totalCount});
        return new Promise(r => r({data,totalCount}));
    }

    async function getQuesDetail(username: string, quesname: string) {
        let quesDetailDoc = await query.getQuesDetail(quesname);
        if (!quesDetailDoc) {
            return new Promise(r => r({ flag: false, err: 'no such question' }));
        }
        let quesDetail = quesDetailDoc.toObject();

        let anDetailDoc = await query.getAnswerDetail(quesname, username);
        let anDetail = anDetailDoc ? anDetailDoc.toObject() : {
            code: '',
            isPass: false,
            speed: -1
        };

        let detail = {
            name: quesname,
            desc: quesDetail['desc'],
            diff: quesDetail['diff'],
            demoInput: quesDetail['demoInput'],
            demoOutput: quesDetail['demoOutput'],
            code: anDetail['code'],
            isPass: anDetail['isPass'],
            speed: anDetail['speed']
        };
        console.log(detail);
        return new Promise(r => r({ flag: true, detail }));
    }

};


export let trainRoute = route;