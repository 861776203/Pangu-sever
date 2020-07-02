var express = require('express');
var router = express.Router();
const { createTable,insertTableCoordinate } = require('../db/tables/tables')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('create', { title: 'createApi' });
});

router.post('/createtables', (req, res, next)=>{
    let urlparams = req.body
    createTable(urlparams, (success) => {
        if(success) {
            // 当表创建完成时向 table_coordinate 表插入信息
            insertTableCoordinate(success, (success2) => {
                res.json({success: 1, status: 1})
            })
        }
    })
})

module.exports = router;
