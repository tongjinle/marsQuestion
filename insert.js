var userList = [{
        "classname": "1610",
        "username": "1610-tongjinle",
        "password": "falcon"
    }, {
        "classname": "1610",
        "username": "1610-zhanheng",
        "password": "falcon"
    }, {
        "classname": "1610",
        "username": "1610-caoqin",
        "password": "falcon"
    }, {
        "classname": "1610",
        "username": "1610-lvzhe",
        "password": "falcon"
    }, {
        "classname": "1609",
        "username": "1609-jack",
        "password": "falcon"
    }, {
        "classname": "1609",
        "username": "1609-tom",
        "password": "falcon"
    }, {
        "classname": "1609",
        "username": "1609-lucy",
        "password": "falcon"
    }, {
        "classname": "1609",
        "username": "1609-vivian",
        "password": "falcon"
    }


];


var quesList = [{
    name:"A+B",
    desc:"编写函数fn,fn输出两个数之和",
    diff:0,
    demoInput:"fn(10,2)",
    demoOutput:"12",
    checker:[
        'var a=100;',
        'var b=100;',
        'return fn(a,b)==200;'
    ].join('')
},{
    name:"n!",
    desc:"编写函数fn,fn输出1*2*3*...*n的结果",
    diff:0,
    demoInput:"fn(3)",
    demoOutput:"6",
    checker:[
        'return fn(5)==120;'
    ].join('')
},{
    name:"括号配对",
    desc:"编写函数fn,fn输出两个数之和",
    diff:3,
    demoInput:[
        "fn('([[]()])')",
        "fn('(])')"
    ].join('\n'),
    demoOutput:[
        "true",
        "false"
    ].join('\n'),
    checker:[
        'var s1="([])";',
        'var s2="()[]";',
        'var s3="(])[";',
        'return fn(s1) && fn(s2) && !fn(s3);'
    ].join('')
}];

var anList = [{
    classname:"1610",
    username:"1610-tongjinle",
    quesname:"A+B",
    code:[
        'function fn(a,b){',
        '   return a+b;',
        '}'
    ].join('\n'),
    isPass:true,
    speed:100,
    ts:new Date(2016,12,10).getTime()
},{
    classname:"1610",
    username:"1610-zhanheng",
    quesname:"A+B",
    code:[
        'function fn(a,b){',
        '   return 1;',
        '}'
    ].join('\n'),
    isPass:false,
    speed:-1,
    ts:new Date(2016,12,11).getTime()
}];


//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

function insertUser() {
    db.users.remove({});

    userList.forEach(us => db.users.insert(us));
}

function insertQues(){
    db.questions.remove({});

    quesList.forEach(qu=>db.questions.insert(qu));
}

function insertAn(){
    db.answers.remove({});

    anList.forEach(n=>db.answers.insert(n));

}


insertUser();
insertQues();
insertAn();






