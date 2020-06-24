let { query } = require("../../config/mysqlConf");
const { param } = require("../../routes");
// let { createTables } = require("../tables/tables_sql")

module.exports = {
    create: (params, callback) => {
        let sqlparams = []
        let tableName = params.name
        delete params.name
        for(let key in params) {
            sqlparams.push(key)
            sqlparams.push(params[key])
        }
        let sql = `create table ${tableName} (id int(255) NOT NULL PRIMARY KEY AUTO_INCREMENT);`
        console.log(sql, sqlparams)
        query(sql, sqlparams, (result) => {
            callback(result);
        })
    },
    // 查询表名
    selectDatabases: (params, callback) => {
        // let databasesName = params.name
        let sql = `select name, x, y from table_coordinate;`
        query(sql,[], (res) => {
            callback(res)
        })
    },
    // 根据表名查询表字段信息
    selectTableinfo: (params, callback) => {
        let sql = `select * from information_schema.COLUMNS where table_name='${params}';`
        query(sql, [], (res) => {
            callback(res)
        })
    },
    // 根据表名更新表的x,y坐标
    updataCoordinate: (params, callback) => {
        let sql = `update table_coordinate set x=${params.x}, y=${params.y} where name='${params.table_name}';`
        query(sql, [], (res) => {
            callback(res)
        })
    }
}