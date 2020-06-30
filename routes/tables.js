var express = require('express');
var router = express.Router();
const { selectTableCoordinate, updataCoordinate, updataColumn } = require('../db/tables/tables')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tables', { title: 'tablesApi' });
});

/**
 * @api {get} /tables/info 查询表信息
 * @apiDescription 数据库表列表
 * @apiName select
 * @apiGroup TablesApi
 * @apiParam {String} name 库名
 * 
 * @apiSuccess {String} name 表名
 * @apiSuccess {Number} x 表的x轴位置
 * @apiSuccess {Number} y 表的y轴位置
 * @apiSuccess {Array} table_list 字段信息
 * 
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "data" : {
 *          "name" : "表名",
 *          "x" : "表的x轴位置",
 *          "y" : "表的y轴位置",
 *          "table_list" : [{
 *              "name": "字段名",
 *              "type": "字段类型",
 *              "notes": "字段备注"
 *           }]
 *      }
 *  }
 * @apiVersion 0.0.1
 */
router.get('/info', function(req, res, next) {
    let tableList = []
    selectTableCoordinate((success) => {
        success.map((item,index) => {
            item.table_list = JSON.parse(item.table_list)
            tableList.push(item)
            if(index+1 == success.length) {
                res.json({data: tableList})
            }
        })
    })
})

/**
 * @api {post} /tables/updata_coordinate 修改表位置
 * @apiDescription 修改表位置
 * @apiName updata
 * @apiGroup TablesApi
 * @apiParam {String} table_name 表名
 * @apiParam {Number} x x轴位置
 * @apiParam {Number} y y轴位置
 * 
 * @apiSuccess {Number} code code
 * @apiSuccess {Number} status 返回状态
 * 
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code": 0,
 *      "status": 1
 *  }
 * @apiVersion 0.0.1
 */
router.post('/updata_coordinate', (req, res, next) => {
    let urlparams = JSON.parse(req.body.list)
    urlparams.map((item,index) => {
        updataCoordinate(item, (success) => {
            if(index+1 == urlparams.length) {
                res.json({code: 0, status: 1})
            }
        })
    })
})

router.post('/move_column', (req, res, next) => {
    let urlparams = req.body
    if(!urlparams.table_name){
        res.send({error: '表名不能为空', status: 1})
    }else if (!urlparams.table_list) {
        res.send({error: '列表数据不能为空', status: 1})
    }else{
        updataColumn(urlparams, (success) => {
            res.json({code: 0, status: 1})
        })
    }
})


module.exports = router;
