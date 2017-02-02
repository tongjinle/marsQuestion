import * as express from 'express';
import * as bodyParser  from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { userRoute } from './userRoute';

let app = express();

app.use(cookieParser());
app.use(session({
      secret: '12345',
     name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
     resave: false,
     saveUninitialized: true,
 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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

    console.log(`Example app listening at http://${host}:${port}`);
});
