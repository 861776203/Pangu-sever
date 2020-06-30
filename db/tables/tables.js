let { query } = require("../../config/mysqlConf");
const { param } = require("../../routes");
// let { createTables } = require("../tables/tables_sql")

module.exports = {
    // 创建表
    createTable: (params, callback) => {
        let sqlparams = []
        let tableName = params.name
        delete params.name
        for(let key in params) {
            sqlparams.push(key)
            sqlparams.push(params[key])
        }
        let sql = `create table ${tableName} (id int(255) NOT NULL PRIMARY KEY AUTO_INCREMENT);`
        query(sql, sqlparams, (result) => {
            callback(tableName);
        })
    },
    // 创建表成功后读取新创建表的字段信息插入 table_coordinate 表
    insertTableCoordinate: (params, callback) => {
        let sql = `insert into table_coordinate (name, x, y, table_list) values (?, ?, ?, ?)`
        let select_table_sql = `select * from information_schema.COLUMNS where table_name='${params}';`
        new Promise((resolve, reject) => {
            query(select_table_sql, params, (result) => {
                result.map((item, index) => {
                    tableList.push({ name: item.COLUMN_NAME, type: item.DATA_TYPE, notes: item.COLUMN_COMMENT })
                    if(index+1 == result.length) {
                        resolve()
                    }
                })
            })
        }).then(() => {
            let sqlparams = [params, 0, 40, JSON.stringify(tableList)]
            query(sql, sqlparams, (result) => {
                console.log(result)
            })
        })
    },
    // 查询 table_coordinate 表数据
    selectTableCoordinate: (callback) => {
        let sql = 'select name,x,y,table_list from table_coordinate;'
        let tableList = []
        query(sql, [], (res) => {
            callback(res)
        })
    },
    // 查询表名
    // selectDatabases: (params, callback) => {
    //     // let databasesName = params.name
    //     let sql = `select name, x, y from table_coordinate;`
    //     query(sql,[], (res) => {
    //         callback(res)
    //     })
    // },
    // // 根据表名查询表字段信息
    // selectTableinfo: (params, callback) => {
    //     let sql = `select * from information_schema.COLUMNS where table_name='${params}';`
    //     query(sql, [], (res) => {
    //         callback(res)
    //     })
    // },
    // 根据表名更新表的x,y坐标
    updataCoordinate: (params, callback) => {
        let sql = `update table_coordinate set x=${params.x}, y=${params.y} where name='${params.name}';`
        query(sql, [], (res) => {
            callback(res)
        })
    },
    // 传入json格式的数组修改 table_coordinate 表中 table_list 顺序
    updataColumn: (params, callback) => {
        let sqlparams = [params.table_list]
        let sql = `update table_coordinate set table_list=? where name='${params.table_name}';`
        query(sql, sqlparams, (res) => {
            callback(res)
        })
    }
}