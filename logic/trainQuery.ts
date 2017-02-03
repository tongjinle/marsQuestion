import * as Mongoose from 'mongoose';
import * as _ from 'underscore';
import BasicQuery from './basicQuery';


let Schema = Mongoose.Schema;

let quesSche = new Schema({
    name:String,
    desc:String,
    input:String,
    output:String,
    diff:Number,
    checker:String

});

let anSche = new Schema({
    username:String,
    quesname:String,
    code:String,
    isPass:Boolean,
    speed:Number
});


export default class TrainQuery extends BasicQuery {
    quesMod:Mongoose.Model<Mongoose.Document>;
    anMod:Mongoose.Model<Mongoose.Document>;
    constructor(){
        super();

        this.open();

        this.quesMod = this.db.model('question',quesSche);
        this.anMod = this.db.model('answer',anSche);
    }

    getQuesDetail(name:string):Promise<Mongoose.Document>{
        return this.quesMod.findOne({name}).exec();
    }

    getAnswerDetail(quesname:string,username:string){
        return this.anMod.findOne({quesname,username}).exec();
    }



    
}
