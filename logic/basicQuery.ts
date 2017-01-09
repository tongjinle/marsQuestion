import * as Mongoose from 'mongoose';
import { connStr } from './config';


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