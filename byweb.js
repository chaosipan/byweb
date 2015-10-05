/**
 * Created by Sam on 2015/10/5 0005.
 */
var git = require('./git'),
    config = require('./config'),
    tools = require('./tools');

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
    //hash = crypto.createHmac('sha1', key).update(new Buffer(body, 'utf-8')).digest('hex');
    hash = tools.hmac('sha1', key, body, 'hex');

    if(hash == sha1) {
        response = 'Going to renew byweb!'
        git.pull(path);
    }
    res.send(response)
}

module.exports.gitPostHandler = gitPostHandler;