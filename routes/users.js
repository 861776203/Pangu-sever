var express = require("express");
var router = express.Router();

let { select, add, del, selectallclass } = require("../db/users/users");
let result = require("../util/result");

router.get("/", function(req, res, next) {
    res.render("users", {
        title: "usersApi",
        apiList: [{
            url: "users/all(查询所有用户)",
            method: "POST",
        }, ],
    });
});

/**
 * @api {get} /users/all 用户列表
 * @apiDescription 用户列表
 * @apiName all
 * @apiGroup UsersApi
 * @apiParam { int } classid 班级id
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "data" : {
 *          "id" : "id",
 *          "name" : "用户名",
 *          "texts" : "内容",
 *          "createdate" : "创建时间",
 *          "classid": "班级id"
 *      }
 *  }
 * @apiVersion 0.0.1
 */
router.get("/all", function(req, res, next) {
    let urlparam = {
        classid: req.query.classid,
    };
    if (!urlparam.classid) {
        return res.status(400).send({error: 'Missing classid'})
    }
    select(urlparam, (success) => {
        if(success.length){
            res.json(success)
        }else{
            // res.json({error: '不存在的班级id'})
            next('error')
        }
    });
});

/**
 * @api {post} /users/add 添加用户
 * @apiDescription 用户列表
 * @apiName add
 * @apiGroup UsersApi
 * @apiParam {string} name 姓名
 * @apiParam {string} texts 内容
 * @apiParam { int } classid 班级id
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "data" : {
 *          "id" : "id",
 *          "name" : "用户名",
 *          "texts" : "内容",
 *          "createdate" : "创建时间",
 *          "classid": "班级id"
 *      }
 *  }
 * @apiVersion 0.0.1
 */
router.post("/add", function(req, res, next) {
    let urlparam = req.body;
    let urlparam2 = {
        classid: urlparam.classid
    }
    add(urlparam, (success) => {
        select(urlparam2, (success2) => {
            res.send(success2);
        });
    });
});

/**
 * @api {get} /users/delete 删除用户
 * @apiDescription 删除
 * @apiName delete
 * @apiGroup UsersApi
 * @apiParam {number} id id
 * @apiParam { int } classid 班级id
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "data" : {
 *          "id" : "id",
 *          "name" : "用户名",
 *          "texts" : "内容",
 *          "createdate" : "创建时间",
 *          "classid": "班级id"
 *      }
 *  }
 * @apiVersion 0.0.1
 */
router.get("/delete", function(req, res, next) {
    let urlparam = {
        id: req.query.id,
        classid: req.query.classid
    };
    let urlparam2 = {
        classid: urlparam.classid
    }
    del(urlparam, (success) => {
        select(urlparam2, (success2) => {
            res.send(success2);
        });
    });
});

/**
 * @api {get} /users/classlist 班级列表
 * @apiDescription 班级信息
 * @apiName classlist
 * @apiGroup UsersApi
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "data" : {
 *          "id" : "id",
 *          "classname" : "班级名称"
 *      }
 *  }
 * @apiVersion 0.0.1
 */
router.get("/classlist", function(req, res, next) {
    selectallclass([], (success) => {
        res.send(success)
    })
})

module.exports = router;