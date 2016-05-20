/**
 * Created by Sam on 2015/10/4 0004.
 */
let express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    github = require('./modules/github'),
    gitosc = require('./modules/gitosc'),
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

let server = app.listen(system.port, function () {
    let host = server.address().address,
        port = server.address().port;

    logHelper.logH('byweb app listening at http://%s:%s',host ,port);
});

//create listeners from pac
function app_post_adapter(byweb, config) {
    let app_list = config.apps;

    for(let key in app_list) {
        let app = app_list[key];
        if(app.vc_type == 'git') {
            if(app.vc_server == 'github') {
                byweb.post(app.watch, github.generator(app));
            }else if(app.vc_server == 'gitosc') {
                byweb.post(app.watch, gitosc.generator(app));
            }
        }
    }
    return byweb;
}