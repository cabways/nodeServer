var express = require('express');
var router = express.Router();
var mysqlConnection = require('../utils/mysql')

/* GET users listing. */
router.get('/login', function (req, res, next) {
  const { username, password } = req.query
  var sql = 'SELECT * FROM students WHERE name = ? AND password = ?';
  //查
  mysqlConnection.query(sql, [ username, password ], function (err, result) {
    console.log(result);
    if(result.length){
      res.send({ message: '登录成功' });
    } else {
      res.send({ message: '登录失败' });
    }
  });
});

module.exports = router;
