import * as express from 'express';
import * as bodyParser  from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import {userRoute} from './userRoute';
import {testRoute} from './testRoute';
import userCache from './userCache';

let app = express();

// app.use(cookieParser());
// app.use(session({
//       secret: '12345',
//      name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
//     cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
//      resave: false,
//      saveUninitialized: true,
//  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// check token

app.use((req: express.Request, res: express.Response, next)=>{
    console.log('req.path',req.path);
    if(req.path=='/stud/login'){
        next();
        return;
    }

    console.log(req.path,req.path.startsWith('/common'));
    if(req.path.startsWith('/common')){
        next();
        return;
    }

    let {token} = req['body'];
    let isVaildToken = userCache.isValid(token);
    if(isVaildToken){
        next();
    }else{
        console.log(token,isVaildToken,userCache['cache']);
        res.json({
            flag:false,
            err:'token is not valid'
        });
    }
});

app.all('*', (req: express.Request, res: express.Response, next) => {
    // console.log('set header');
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

testRoute(app);
userRoute(app);




var server = app.listen(9527, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`Example app listening at http://${host}:${port}`);
});
