import * as express from "express";
import * as session from 'express-session';


let route = (app: express.Application) => {

    app.get('/test', (req: express.Request, res: express.Response) => {
        let {testname, testage } = req.query;
        console.log(testname, testage);
        // res.end(`myname is ${testname}`);
        let sess = req['session'];
        console.log(sess['ts']);
        sess['ts'] = Date.now();
        res.json({ testname, testage });
    });

    app.get('/test/html', (req: express.Request, res: express.Response) => {
        res.write('<html>');
        res.write('<body>');
        res.write('<div style="color:red;">hello world</div>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    });

    app.get('/test/async',(req:express.Request,res:express.Response)=>{
       async function  myDelay (){
            console.log(1,Date.now());
            console.log(await  _delay(100,1000));
            
            console.log(2,Date.now());
            console.log(await  _delay(200,1000));
        } 

        function _delay(val:number,t){
            return new Promise((r) => setTimeout(r(val), t));
        }

        myDelay().then(()=>{
            console.log(3,Date.now());
            res.end('async end');

        });


    });

    app.post('/login', (req: express.Request, res: express.Response) => {
        let {username, password} = req['body'];
        // let username = req.query['username'];
        // let from = parseInt(req.query['from']);
        // let to = parseInt(req.query['to']);

        // query.findHist(username, from, to).exec((err, data) => {
        //     res.json({
        //         flag: true,
        //         data
        //     });
        // });
    });
};


export let userRoute = route;