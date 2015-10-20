/**
 * Created by Sam on 2015/10/4 0004.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    github = require('./modules/github'),
    config = require('./config'),
    logHelper = require('./modules/logHelper'),
    system = config.system;

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/', function(req, res) {
    res.send('It\'s byweb.');
});

app.get('/test', function(req, res) {
    console.log(req);
    res.send('test function!');
});

app = app_post_adapter(app, config);

var server = app.listen(system.port, function () {

    var host = server.address().address;
    var port = server.address().port;

    logHelper.logH('byweb app listening at http://' + host + ':' + port)
});

//根据配置文件生成监听器
function app_post_adapter(byweb, config) {
    var app_list = config.apps;

    for(var key in app_list) {
        var app = app_list[key];
        if(app.vc_type == 'git') {
            if(app.vc_server == 'github') {
                byweb.post(app.watch, github.generator(app));
            }
        }
    }
    return byweb;
}