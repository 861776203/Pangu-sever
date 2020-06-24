let { query } = require("../../config/mysqlConf");
let { selectUser, selectClass, addUser, delUser } = require("./users_sql");

module.exports = {
    select: (params, callback) => {
        let { classid } = params;
        let sqlparam = [classid];
        query(selectUser, sqlparam, (result) => {
            callback(result);
        });
    },
    add: (params, callback) => {
        let { name, texts, classid } = params;
        let sqlparam = [name, texts, classid];
        query(addUser, sqlparam, (result) => {
            callback(result);
        });
    },
    del: (params, callback) => {
        let { id, classid } = params;
        let sqlparam = [id, classid];
        query(delUser, sqlparam, (result) => {
            callback(result);
        });
    },
    selectallclass: (params, callback) => {
        query(selectClass, [], (result) => {
            callback(result);
        });
    },
};
