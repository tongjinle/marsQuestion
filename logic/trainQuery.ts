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
    username: String,
    quesname: String,
    code: String,
    isPass: Boolean,
    speed: Number
});


export default class TrainQuery extends BasicQuery {
    quesMod: Mongoose.Model<Mongoose.Document>;
    anMod: Mongoose.Model<Mongoose.Document>;
    constructor() {
        super();

        this.open();

        this.quesMod = this.db.model('question', quesSche);
        this.anMod = this.db.model('answer', anSche);
    }

    // 获取所有的问题
    getQuesList(diff: number) {
        let query = this.quesMod.find({ diff });
        // if(isFilterPass){
        //     let filterQuery = this.anMod.find({username,isPass:true}).select('quesname').exec();

        //     query = query.find({name:{$nin:filterQuery}});
        // }
        return query;


    }


    // 获取某题的所有提交的答题细节
    getAnList(username: string) {
        let query = this.anMod.find({ username });
        return query;
    }

    // 统计每个题目的答题情况
    // isPass 是否筛选答对的情况
    getAnCount(quesnameList: string[], isPass: boolean = false) {
        let _id = { quesname: '$quesname' };
        let pipe = [];

        pipe.push({ $match: { quesname: { $in: quesnameList } } });
        if (isPass) {
            // _id['isPass'] = '$isPass';
            pipe.push({ $match: { isPass: true } })
        }
        pipe.push({ $group: { _id, count: { $sum: 1 } } });

        let query = this.anMod.aggregate(pipe);

        return query;
    }

    removeCode(username:string,quesname:string){
        return this.anMod.remove({username,quesname});
    }

    commitCode(username:string,quesname:string,code:string,isPass:boolean,speed:number){

        let mod = new this.anMod({username,quesname,code,isPass,speed});
        return mod.save();
    }

    getQuesDetail(name: string): Promise<Mongoose.Document> {
        return this.quesMod.findOne({ name }).exec();
    }

    getAnswerDetail(quesname: string, username: string) {
        return this.anMod.findOne({ quesname, username }).exec();
    }




}
