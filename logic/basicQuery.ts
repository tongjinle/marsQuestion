import * as Mongoose from 'mongoose';
import { connStr } from './config';

var DB_CONN_STR = 'mongodb://localhost:27017/QuestionDb';

var data=function(db,callback){
	db.eval('get_tb2_count()',function(err,result){
		if(err){
			console.log('Error: '+err);
			return;
		}
		callback(result);
	})
}

MongoClient.connect(DB_CONN_STR,function(err,db){
	console.log("Success!");
	data(db,function(result){
		console.log(result);
		db.close();
	})
})

abstract class BasicQuery {
    db: Mongoose.Connection;

    open() {
        this.db = Mongoose.createConnection(connStr);
    }

    close() {
        this.db.close();
    }

}

export default BasicQuery;