import * as Mongoose from 'mongoose';

var DB_CONN_STR = 'mongodb://localhost:27017/QuestionDb';

var route = function(app) {
    // app.get('/test', (req: express.Request, res: express.Response) => {
    //     let {testname, testage } = req.query;
    //     console.log(testname, testage);
    //     // res.end(`myname is ${testname}`);
    //     res.json({ testname, testage });
    // });
    // app.get('/test/html', (req: express.Request, res: express.Response) => {
    //     res.write('<html>');
    //     res.write('<body>');
    //     res.write('<div style="color:red;">hello world</div>');
    //     res.write('</body>');
    //     res.write('</html>');
    //     res.end('');
    // });
    // app.post('/login', (req: express.Request, res: express.Response) => {
    //     let {username, password} = req['body'];
    //     // let username = req.query['username'];
    //     // let from = parseInt(req.query['from']);
    //     // let to = parseInt(req.query['to']);
    //     // query.findHist(username, from, to).exec((err, data) => {
    //     //     res.json({
    //     //         flag: true,
    //     //         data
    //     //     });
    //     // });
    // });
    app.get('/getStudListByClass', function(req, res) {
        var data=[];
        db.open(function(err, db){
             if (!err) {
                db.collection('studentName', function(err, collection) {
                    if (err) {
                        mongodb.close();
                        return callback(err);
                    }
                    collection.find(
                        req
                    , function(err, usr_data) {
                        mongodb.close();
                        if (err) {
                            return callback(err);
                        }
                        callback(null, usr_data);
                    });
                });
            }
        }

        usr_data.forEach(function(item){
            data.push(item.name);
        })
        //----------
        res.json({
            data: data
        });
    });
};
exports.userRoute = route;