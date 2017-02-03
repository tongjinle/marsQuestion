import * as Mongoose from 'mongoose';
import * as _ from 'underscore';
import BasicQuery from './basicQuery';


let Schema = Mongoose.Schema;

let userSche = new Schema({
    username:String,
    password:String,

});


export default class UserQuery extends BasicQuery {
    mod:Mongoose.Model<Mongoose.Document>;
    constructor(){
        super();

        this.open();

        this.mod = this.db.model('user',userSche);
    }

    findUser(username:string,password:string):Promise<Mongoose.Document[]>{
        return this.mod.find({username,password}).exec();
    }

    editPwd(username:string,password:string):Promise<Mongoose.Document>{
        return this.mod.findOneAndUpdate({username},{$set:{password}}).exec();
    }

    getClassList(){
        return this.mod.distinct('class').exec();
    }

    getStudListByClass(klass:string){
        return this.mod.find({class:klass})
        .select('username')
        .exec();
    }
    
}
