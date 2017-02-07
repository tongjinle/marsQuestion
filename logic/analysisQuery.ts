import * as Mongoose from 'mongoose';
import * as _ from 'underscore';
import BasicQuery from './basicQuery';


let Schema = Mongoose.Schema;

let quesSche = new Schema({
    name: String,
    desc: String,
    input: String,
    output: String,
    diff: Number,
    checker: String

});

let anSche = new Schema({
    classname: String,
    username: String,
    quesname: String,
    code: String,
    isPass: Boolean,
    speed: Number
});
/*
// 时间段
    timeRange:{
        begin:number,
        end:number
    },
    // 题目难度
    diffRange:{
        begin:number,
        end:number
    },
    // 类型 
    // 0表示学生,1表示班级
    type:number,
    // 分析项
    // 学生传usernmae列表
    // 班级传class列表
    keyList:string[]
*/


export default class AnalysisQuery extends BasicQuery {
    quesMod: Mongoose.Model<Mongoose.Document>;
    anMod: Mongoose.Model<Mongoose.Document>;
    constructor() {
        super();

        this.open();

        this.quesMod = this.db.model('question', quesSche);
        this.anMod = this.db.model('answer', anSche);
    }

    // 获取所有的问题
    count(timeRange: { begin: number, end: number }, diffRange: { begin: number, end: number }, type: number, keyList: string[],isPass:boolean=false) {
        let pipe = [];
        let keyname = ['username', 'classname'][type];
        let match:any = {
            ts: { $gte: timeRange.begin, $lte: timeRange.end },
            diff: { $gte: diffRange.begin, $lte: diffRange.end },
            // 0 -> stud
            // 1 -> class
            [keyname]: { $in: keyList }
        };

        // isPass是否是要求"答题正确"的记录
        if(isPass){
            match['isPass'] = true;
        }

        pipe.push({
            $match: match
        });
        pipe.push({
            $group:{
                _id:{key:`$${keyname}`,diff:'$diff'},
                count:{$sum:1}
            }
        });

        console.log({pipe});

        let query = this.anMod.aggregate(pipe);
     
        return query;


    }

    /*
        9 学生自我统计报表
req:
url:'/analysisSelf'
type:get
params:{
    token:string
}

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




}
