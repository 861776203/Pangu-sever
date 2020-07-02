let { query } = require("../../config/mysqlConf");
const { param } = require("../../routes");
// let { createTables } = require("../tables/tables_sql")

module.exports = {
    // 创建表
    createTable: (params, callback) => {
        let sqlparams = []
        let tableName = params.table_name
        let columnList = JSON.parse(params.columnList)
        let sql = `create table ${tableName} (id int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT);`
        new Promise((resolve, reject) => {
            query(sql, [], (result) => {
                resolve()
            })
        }).then(() => {
            columnList.map((item, index) => {
                let addcolumnsql = `alter table ${tableName} add ${item.column_name} ${item.type} comment ?`
                sqlparams = [item.notes]
                query(addcolumnsql, sqlparams, (result) => {
                    if(index+1 == columnList.length) {
                        callback(tableName)
                    }
                })
            })
        })
    },
    // 创建表成功后读取新创建表的字段信息插入 table_coordinate 表
    insertTableCoordinate: (params, callback) => {
        let tableList = []
        let sql = `insert into table_coordinate (name, x, y, table_list) values (?, ?, ?, ?)`
        let select_table_sql = `select * from information_schema.COLUMNS where table_name='${params}';`
        new Promise((resolve, reject) => {
            query(select_table_sql, params, (result) => {
                result.map((item, index) => {
                    tableList.push({ name: item.COLUMN_NAME, type: item.COLUMN_TYPE, notes: item.COLUMN_COMMENT })
                    if(index+1 == result.length) {
                        resolve()
                    }
                })
            })
        }).then(() => {
            let sqlparams = [params, 0, 40, JSON.stringify(tableList)]
            query(sql, sqlparams, (result) => {
                callback(result)
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