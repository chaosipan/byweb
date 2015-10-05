/**
 * Created by Sam on 2015/10/4 0004.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    hexo = require('./hexo'),
    config = require('./config'),
    byweb = config.byweb;

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.post('/git', hexo.gitPostHandler);

var server = app.listen(byweb.port, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('byweb app listening at http://%s:%s', host, port)

});