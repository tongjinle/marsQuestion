import * as express from "express";

var users=[{username:'1108-cq',password:'z12345678',token:''}];
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
        let arr=[];
        for(let i=0;i<users.length;i++){
            if(users[i].username==req['body'].username&&users[i].password==req['body'].password){
                for(let j=0;j<16;j++){
                    let n=Math.floor((1<<4)*Math.random()).toString(16);
                    arr.push(n);
                }
                let token=arr.join('');
                users[i].token=token;
                res.json({flag:true,token:token});
            }else{
                res.json({flag:false});
            }
        }
        //let {username, password} = req['body'];
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
    app.post('/editPwd', (req: express.Request, res: express.Response) => {
        let reg=/^[a-zA-Z][a-zA-Z0-9_]{7,15}$/;
        if(!reg.test(req['body'].oldPassword)){
            res.json({flag:false});
        } 
        for(let i=0;i<users.length;i++){
            if(users[i].password==req['body'].oldPassword){
                if(users[i].token==req['body'].token){
                users[i].password=req['body'].newPassword;
                res.json({flag:true});
                return;
                }
            }else{
                res.json({flag:false});
            }
            
        }
    });
};


export let userRoute = route;