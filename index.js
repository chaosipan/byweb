/**
 * Created by Sam on 2015/10/4 0004.
 */
let express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    mysqlModel = require('mysql-model'),
    github = require('./modules/github'),
    gitosc = require('./modules/gitosc'),
    config = require('./config'),
    apis = require('./modules/apis'),
    logHelper = require('./modules/logHelper'),
    AppModel = mysqlModel.createConnection(config.mysql),
    system = config.system;

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(session({
    cookie: {
        maxAge: config.session.cookie.maxAge
    },
    secret: config.session.secret ,
    store: new MongoStore({
        url: 'mongodb://localhost/byweb'
    }),
    saveUninitialized: config.session.saveUninitialized,
    resave: config.session.resave
}));

app.use(express.static('public'));
app.use('/assets', express.static('node_modules/admin-lte'));

apis(app, AppModel);
app_post_adapter(app, config);

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
}

//listen to exit event
process.on('exit', (code) => {
    console.log('About to exit with code:', code);
});

//listen to uncaughtException
process.on('uncaughtException', (err) => {
    console.error(`Caught exception: ${err}`);
});

function recycle() {

}