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

    if(signature != '') {
        sha1 = signature.split('=')[1];
    }
    body = JSON.stringify(req.body);
    hash = tools.hmac('sha1', key, body, 'hex');

    if(hash == sha1) {
        response = 'Going to renew hexo!';
        git.pull(path);
    }
    res.send(response)
}

module.exports.gitPostHandler = gitPostHandler;