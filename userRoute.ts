import * as express from "express";


let route = (app: express.Application) => {

    app.get('/test', (req: express.Request, res: express.Response) => {
        let {testname, testage } = req.query;
        console.log(testname, testage);
        // res.end(`myname is ${testname}`);
        res.json({ testname, testage });
    });

    app.get('/test/html', (req: express.Request, res: express.Response) => {
        res.write('<html>');
        res.write('<body>');
        res.write('<div style="color:red;">hello world</div>');
        res.write('</body>');
        res.write('</html>');
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