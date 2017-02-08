import * as express from "express";
import * as session from 'express-session';
import userCache from './userCache';
import AnalysisQuery from '../logic/analysisQuery';
import UserQuery from '../logic/userQuery';
import * as _ from 'underscore';




let query = new AnalysisQuery();
let userQuery = new UserQuery();

let route = (app: express.Application) => {
    app.post('/admin/analysis', (req: express.Request, res: express.Response) => {
        let {timeRange, diffRange, type, keyList} = req['body'];
        let countQuery = count(timeRange, diffRange, type, keyList);

        countQuery.then(data => {
            console.log({ countQuery: data });
            res.json({ flag: !!data, data });
        });
    });


    app.get('/stud/analysisSelf', (req: express.Request, res: express.Response) => {
        let token = req.headers['token'];
        let username = userCache.getUsername(token);
        let countSelfQuery = countSelf(username);

        countSelfQuery.then(data => {
            if (data) {
                data['flag'] = true;
            } else {
                data = { flag: false };
            }
            res.json(data);
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



/*

res:{
    flag:boolean,
    countList:{
        // 难度
        diff:number,
        // 正确答题数量
        right:number,
        // 答题总数
        total:number
    }[],
    // 班级排名
    classIndex:number,
    // 班级人数
    classCount:number,
    // 火星排名
    marsIndex:number,
    // 火星人数
    marsCount:number
}
*/
async function countSelf(username: string) {
    let userDoc = await userQuery.findUser(username);
    if (!userDoc) {
        return new Promise(r => r(undefined));
    }
    let user = userDoc.toObject();
    // console.log({ user });
    let classname = user['classname'];

    // console.log({ user, classname, username });

    let rightCommit = await query.countRightCommit(classname, username);
    let totalCommit = await query.countTotalCommit(classname, username);
    // console.log({ rightCommit, totalCommit });

    let countData = [];
    let diffRange = { begin: 0, end: 4 };
    for (var i = diffRange.begin; i <= diffRange.end; i++) {
        countData.push({ diff: i, right: 0, total: 0 });
    }
    format(rightCommit, 'right');
    format(totalCommit, 'total');


    let classRank = await query.countClassRank(classname);
    let classUserCount = await userQuery.getUserCount(classname);
    let classIndex = _.findIndex(classRank, cr => cr['_id']['username'] == username);
    classIndex = classIndex == -1 ? classRank.length : classIndex;

    let worldRank = await query.countWorldRank();
    let worldUserCount = await userQuery.getUserCount();
    let worldIndex = _.findIndex(worldRank, wr => wr['_id']['username'] == username);
    worldIndex = worldIndex == -1 ? worldRank.length : worldIndex;
    console.log({ classRank, classUserCount, worldRank, worldUserCount });

    let data = { countList: countData, classIndex, marsIndex: worldIndex, classCount: classUserCount, marsCount: worldUserCount };


    return new Promise(r => r(data));

    //
    function format(rawData: any[], countname: string) {

        rawData.forEach(an => {
            console.log({ an });
            let diff = an["_id"]["diff"];
            let count = an["count"];
            console.log({ diff, count });
            let item = _.find(countData, item => item['diff'] == diff);

            item[countname] = count;
        });
    }
}



export let analysisRoute = route;