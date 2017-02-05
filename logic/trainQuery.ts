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


    getQuesList(diff: number) {
        let query = this.quesMod.find({ diff });
        // if(isFilterPass){
        //     let filterQuery = this.anMod.find({username,isPass:true}).select('quesname').exec();

        //     query = query.find({name:{$nin:filterQuery}});
        // }
        return query;


    }


    getAnList(username: string) {
        let query = this.anMod.find({ username });
        return query;
    }

    // isPass 
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

    getQuesDetail(name: string): Promise<Mongoose.Document> {
        return this.quesMod.findOne({ name }).exec();
    }

    getAnswerDetail(quesname: string, username: string) {
        return this.anMod.findOne({ quesname, username }).exec();
    }




}
