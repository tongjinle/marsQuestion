function insertUser() {
    db.users.remove({});

     
    var userList = [{
        "username": "1610-tongjinle",
        "password": "falcon"
    }, {
        "username": "1610-zhanheng",
        "password": "falcon"
    }, {
        "username": "1610-caoqin",
        "password": "falcon"
    }, {
        "username": "1610-lvzhe",
        "password": "falcon"
    }];

    userList.forEach(us => db.users.insert(us));
}


insertUser();