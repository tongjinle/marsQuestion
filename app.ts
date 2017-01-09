import * as express from 'express';

import { userRoute } from './userRoute';

let app = express();


app.all('*', (req: express.Request, res: express.Response, next) => {
    // console.log('set header');
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


userRoute(app);






var server = app.listen(5050, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
