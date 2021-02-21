var express = require('express');
var router = express.Router();


/* GET users listing. */

router.get('/', function(req, res, next) {
    
  connectionMysqlDb.query('SELECT * FROM tb_sv', function (error, rows) {

    if (error) throw error;
    thedata = ({'student' : rows});
    console.log(thedata);

    res.json(thedata)
  });




  /*Create */
  router.get('/create-sv', function(req, res, next) {

    var sql = `INSERT INTO tb_sv(name, age) VALUES ('${req.query.name}', ${req.query.age})`;
    connectionMysqlDb.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result)
    });
  });

  router.get('/find', function(req, res, next) {
    try{
      var sql = `SELECT * FROM tb_sv WHERE mssv = ${checkUndefined(req.query.mssv)} OR name = ${checkUndefined(req.query.name)}  OR age = ${checkUndefined(req.query.age)}`;
      connectionMysqlDb.query(sql, function (err, result) {
        if (err) {
          res.statusCode = 404
          res.json(formERR("field is errr"))
          return
        };
        res.json(formData(result))
      });
    }catch(errTry){
      res.statusCode = 404
      res.json(formERR(errTry.str))
    }
    
  });

  /* Update */
  router.get('/update/:mssv', function(req, res, next) {
    try{
      var sql = `UPDATE tb_sv SET  name = '${checkUndefined(req.query.name)}', age = ${checkUndefined(req.query.age)} WHERE mssv = ${req.params.mssv}`;
      console.log(sql)
      connectionMysqlDb.query(sql, function (err, result) {
        if (err) {
          res.statusCode = 404
          res.json(formERR("MYSQL CODE is FAIL"))
          return
        };
        res.json(formData(result))
      });
    }catch(errTry){
      res.statusCode = 404
      res.json(formERR(errTry.str))
    }
    
  });


  /* DELETE */
  router.get('/delete/', function(req, res, next) {
    try{
      var sql = `DELETE FROM tb_sv WHERE mssv=${req.query.mssv};`;
      console.log(sql)
      connectionMysqlDb.query(sql, function (err, result) {
        if (err) {
          res.statusCode = 404
          res.json(formERR("MYSQL CODE is FAIL"))
          return
        };
        res.json(formData(result))
      });
    }catch(errTry){
      res.statusCode = 404
      res.json(formERR(errTry.str))
    }
  });

  /* Search by name */
  router.get('/search', function(req, res, next) {
    try{
      var sql = `SELECT * FROM tb_sv WHERE name LIKE '%${checkUndefined(req.query.name)}%'`;
      console.log(sql)
      connectionMysqlDb.query(sql, function (err, result) {
        if (err) {
          res.statusCode = 404
          res.json(formERR("MYSQL CODE is FAIL"))
          return
        };
        res.json(formData(result))
      });
    }catch(errTry){
      res.statusCode = 404
      res.json(formERR(errTry.str))
    }
    

  });

///// END
});



/* CHECK NULL undefined */
  
function checkUndefined(value) {
  if(value === undefined){
    return '1'
  }
  return value
}

function formData(value) {
  return ({'data' : value})
}

function formERR(str) {
  return ({'err' : str})
}

module.exports = router;
