var userList = [{
    "class":"1610",
    "username": "1610-tongjinle",
    "password": "falcon"
}, {
    "class":"1610",
    "username": "1610-zhanheng",
    "password": "falcon"
}, {
    "class":"1610",
    "username": "1610-caoqin",
    "password": "falcon"
}, {
    "class":"1610",
    "username": "1610-lvzhe",
    "password": "falcon"
},{
    "class":"1609",
    "username": "1609-jack",
    "password": "falcon"
}, {
    "class":"1609",
    "username": "1609-tom",
    "password": "falcon"
}, {
    "class":"1609",
    "username": "1609-lucy",
    "password": "falcon"
}, {
    "class":"1609",
    "username": "1609-vivian",
    "password": "falcon"
}


];


function insertUser() {
    db.users.remove({});

    userList.forEach(us => db.users.insert(us));
}



insertUser();