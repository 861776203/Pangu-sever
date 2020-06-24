var express = require('express');
var router = express.Router();
const { create } = require('../db/tables/tables')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('create', { title: 'createApi' });
});

router.get('/createtables', (req, res, next)=>{
    let urlparams = req.query
    create(urlparams, (success) => {
        res.send(success)
    })
})

module.exports = router;
