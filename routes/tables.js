var express = require('express');
var router = express.Router();
const { selectDatabases, selectTableinfo, updataCoordinate } = require('../db/tables/tables')
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
 * @apiSuccess {String} table_name 表名
 * @apiSuccess {Number} x 表的x轴位置
 * @apiSuccess {Number} y 表的y轴位置
 * @apiSuccess {Array} info 字段信息
 * 
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "data" : {
 *          "table_name" : "表名",
 *          "x" : "表的x轴位置",
 *          "y" : "表的y轴位置",
 *          "info" : [{
 *              "name": "字段名",
 *              "type": "字段类型",
 *              "notes": "字段备注"
 *           }]
 *      }
 *  }
 * @apiVersion 0.0.1
 */
router.get('/info', function(req, res, next) {
    let urlparams = req.query
    let tableList = []
    let count = 0
    selectDatabases(urlparams, (success)=>{
        success.map((item, index)=>{
            tableList.push({table_name: item.name, x: item.x, y: item.y })
            selectTableinfo(item.name, (success2) => {
                // tableList[index].info = [{ name: index }]
                tableList[index].info = []
                success2.map((item2, index2) => {
                    tableList[index].info.push({ name: item2.COLUMN_NAME, type: item2.COLUMN_TYPE, notes: item2.COLUMN_COMMENT })
                    if(index2+1 == success2.length) {
                        count += 1
                    }
                    if(count===3) {
                        res.json({ code: 0, data: tableList })
                    }
                })
                // console.log(success2)
                // console.log(tableList)
            })
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


module.exports = router;
