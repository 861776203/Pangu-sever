module.exports = {
    selectUser: "select id,name,texts,createdate from wukongusers where classid=?;",
    selectClass: "select id,classname from wukongclass;",
    addUser: "insert into wukongusers (name,texts,classid) values (?,?,?)",
    delUser: "delete from wukongusers where id=? and classid=?;"
};