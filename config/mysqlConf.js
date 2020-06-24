let mysql = require('mysql')

let mysql_config = { 
    connectionLimit: 10, // 最大连接数
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node_demo'
}

let pool = mysql.createPool(mysql_config)

function query(sql, values, callback) {
    pool.getConnection((err, connection) => {
        if (err) throw err
        connection.query(sql, values, (err, res, fields) => {
            if (err) throw err
            callback(res)
            // 释放连接池至缓存区
            pool.releaseConnection(connection)
        })
    })
}

module.exports = {
    query
}