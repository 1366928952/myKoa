const mysql = require('mysql')
const { database } = require('../config/default')
 
const pool = mysql.createPool({
  host: database.HOST,
  port: database.PORT,
  user: database.USER,
  password: database.PASSWORD,
  database: database.DATABASE
})
 
exports.query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        console.log(err, "数据库连接失败");
        resolve({
          code: 500,
        })
      } else {
        console.log("数据库连接成功");
        connection.query(sql, values, (err, results) => {
          if (err) {
            reject(err)
            resolve({
              code: 400
            })
          } else {
            resolve({
              data: JSON.parse(JSON.stringify(results)),
            })
            // connection.release()
          }
          connection.release() // 释放连接池
        })
      }
    })
  })
}