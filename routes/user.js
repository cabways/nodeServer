var express = require('express');
var router = express.Router();
var {
  query
} = require('../utils/mysql')

/* GET users listing. */
router.get('/login', async function (req, res, next) {
  const { username, password } = req.query
  var sql = 'SELECT * FROM users WHERE username = ? AND password_hash = ?';
  //查
  const result = await query(sql, [ username, password ])
  if(result.length){
    const user = result[0]
    req.session.userId = user.id;
    res.send({ message: '登录成功' });
  } else {
    res.send({ message: '登录失败' });
  }
});

router.get('/me', async function (req, res, next) {
  var sql = 'SELECT * FROM users WHERE id = ?';
  if(req.session.userId){
    const result = await query(sql, [ req.session.userId ])
    if(result.length){
      res.send({ message: '登录成功',data: result[0] });
    } else {
      return res.status(401).json({ message: '登录状态已失效' });
    }
  } else {
    return res.status(401).json({ message: '请先登录' });
  }

});

router.post('/logout', async function (req, res, next) {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('connect.sid', { path: '/' });
    res.json({ message: '退出登录成功' });
  });
})

router.post('/register', async function (req, res, next) {
  const { username, password, email } = req.body
  var findSql = 'SELECT * FROM users WHERE username = ?';
  var insertSql = 'INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)';
  //查
  const findResult = await query(findSql, [ username ])
  if(findResult.length){
    res.send({ message: '用户已注册' });
    return
  }
  const result = await query(insertSql, [ username, password, email ])
  if(result.affectedRows === 1){
    res.send({ message: '注册成功' });
  } else {
    res.send({ message: '注册失败' });
  }
});

module.exports = router;
