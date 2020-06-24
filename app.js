var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs')
var FileStreamRotator = require('file-stream-rotator')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var createRouter = require('./routes/create')
var tablesRouter = require('./routes/tables')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var logDirectory = path.join(__dirname, 'logs')
// 日志文件夹创建
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYY-MM-DD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
})
// 错误日志
var errorLogfile = FileStreamRotator.getStream({
    date_format: 'YYYY-MM-DD',
    filename: path.join(logDirectory, 'error-%DATE%.log'),
    frequency: 'daily',
    verbose: false
})

function skip(req) {
    return (req.url).indexOf('stylesheets') !== -1
}

app.use(logger('dev'))
app.use(logger('dev', {skip: skip, stream: accessLogStream}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 跨域解决
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/create', createRouter)
app.use('/tables', tablesRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // 生成错误日志
    var now = new Date()
    var time = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + '' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
    var meta = '[' + time + ']' + req.method + '' + req.url + '\r\n'
    errorLogfile.write(meta + err.stack + '\r\n\r\n\r\n')
    next()
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {error: err});
});

// module.exports = app;
var debug = require('debug')('my-application'); // debug模块
app.set('port', process.env.PORT || 3000); // 设定监听端口
var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});