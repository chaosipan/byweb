/**
 * Created by Sam on 2015/10/4 0004.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    hexo = require('./hexo'),
    byweb = require('./byweb'),
    config = require('./config'),
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

app.post('/git/hexo', hexo.gitPostHandler);

app.post('/git/byweb', byweb.gitPostHandler);

var server = app.listen(system.port, function () {

    var host = server.address().address;
    var port = server.address().port;
    var test = 1;
    console.log('byweb app listening at http://%s:%s', host, port)

});