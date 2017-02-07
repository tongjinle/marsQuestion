import * as express from "express";
import * as session from 'express-session';
import userCache from './userCache';
import AnalysisQuery from '../logic/analysisQuery';
import UserQuery from '../logic/userQuery';
import * as _ from 'underscore';




let query = new AnalysisQuery();

let route = (app: express.Application) => {
    app.post('/admin/analysis', (req: express.Request, res: express.Response) => {
        let {timeRange, diffRange, type, keyList} = req['body'];
        let countQuery = count(timeRange, diffRange, type, keyList);

        countQuery.then(data => {
            console.log({ countQuery: data });
            res.json({flag:true,data});
        });
    });
};


////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
/*
data:{
        key:string,
        // 针对key的统计分析
        countList:{
            // 难度
            diff:number,
            // 正确答题数量
            right:number,
            // 答题总数
            total:number
        }[]
    }[]

[
  {
    "_id": {
      "key": "1609-jack",
      "diff": 0
    },
    "count": 1
  }
]


    */

async function count(timeRange: { begin: number, end: number }, diffRange: { begin: number, end: number }, type: number, keyList: string[]) {
    let analysisRightCount = await query.count(timeRange, diffRange, type, keyList, true);
    let analysisTotalCount = await query.count(timeRange, diffRange, type, keyList);
    let countData = [];

    console.log({ analysisTotalCount });

    format(analysisRightCount, 'right');
    format(analysisTotalCount, 'total');


    console.log({ countData });

    let data = countData;
    return new Promise(r => r(data));


    
    // 
    function format(rawData: any[], countname: string) {
        rawData.forEach(an => {
            console.log(an);
            let key = an["_id"]["key"];
            let diff = an["_id"]["diff"];
            let count = an["count"];
            console.log({ key, diff, count });
            let item = _.find(countData, item => item['key'] == key);
            if (!item) {
                let countList = [];
                for (var i = diffRange.begin; i <= diffRange.end; i++) {
                    countList.push({ diff: i, right: 0, total: 0 });
                }
                item = { key, countList };
                countData.push(item);
            }
            let itemCount = _.find(item.countList, item => item['diff'] == diff);

            itemCount[countname] = count;
        });
    }
}



export let analysisRoute = route;