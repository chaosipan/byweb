/**
 * Created by Sam on 2015/10/4 0004.
 */
var git = require('./git'),
    config = require('./config'),
    logHelper = require('./logHelper'),
    tools = require('./tools');

function gitPostHandler(req, res) {
    var signature = req.headers['x-hub-signature'] ? req.headers['x-hub-signature'] : '',
        sha1 = '',
        body = '',
        hash = '',
        path = config.hexo.path,
        response  = 'Wrong request!',
        key = config.hexo.key;

    logHelper.logH('An hexo req.');

    if(signature != '') {
        sha1 = signature.split('=')[1];
    }
    body = JSON.stringify(req.body);
    hash = tools.hmac('sha1', key, body, 'hex');

    if(hash == sha1) {
        response = 'Going to renew hexo!';
        var funcArray = new Array(update_hexo);
        git.pull(path, funcArray);
    }
    res.send(response)
}

function update_hexo() {
    exec('npm install', {silent:true}, function(code, output) {
        logHelper.logH('Exit code:'+ code);
        logHelper.logH('npm install output:\n' + output);

        exec('hexo generate', {silent:true}, function(code, output) {
            logHelper.logH('Exit code:'+ code);
            logHelper.logH('hexo generate output:\n' + output);
        });
    });
}

module.exports.gitPostHandler = gitPostHandler;