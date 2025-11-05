var mysql = require('mysql');

const getConnection = (option) => {
    const connection = mysql.createConnection(option)
    // 测试连接
    connection.connect(err => {
        if (err) throw err;
    })
    return connection
}

const connection = getConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'cabways'
})

module.exports = connection;

// const select = (connection) => {
//     var sql = 'SELECT * FROM students';
//     //查
//     connection.query(sql, function (err, result) {
//         if (err) {
//             console.log('[SELECT ERROR] - ', err.message);
//             return;
//         }
//         console.log(result);
//     });
// }
// select(connection)

// connection.end()
// var addSql = 'INSERT INTO students(id,name,password) VALUES(0,?,?)';
// var addSqlParams = ['马中原', '123456789'];
// //增
// connection.query(addSql, addSqlParams, function (err, result) {
//     if (err) {
//         console.log('[INSERT ERROR] - ', err.message);
//         return;
//     }
// });