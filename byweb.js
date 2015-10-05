/**
 * Created by Sam on 2015/10/5 0005.
 */
var git = require('./git'),
    logHelper = require('./logHelper'),
    config = require('./config'),
    Thenjs = require('thenjs'),
    tools = require('./tools');

require('shelljs/global');

function gitPostHandler(req, res) {
    var signature = req.headers['x-hub-signature'] ? req.headers['x-hub-signature'] : '',
        sha1 = '',
        body = '',
        hash = '',
        path = config.byweb.path,
        response  = 'Wrong request!',
        key = config.byweb.key;

    if(signature != '') {
        sha1 = signature.split('=')[1];
    }
    body = JSON.stringify(req.body);
    hash = tools.hmac('sha1', key, body, 'hex');

    if(hash == sha1) {
        response = 'Going to renew byweb!'
        git.pull(path, [update_byweb]);
    }
    res.send(response)
}

function update_byweb() {
    exec('npm install', Thenjs(function(code, output) {
        logHelper.logH('Exit code:'+ code);
        logHelper.logH('npm install output:\n' + output);
    }));
}

module.exports.gitPostHandler = gitPostHandler;