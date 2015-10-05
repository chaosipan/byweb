/**
 * Created by Sam on 2015/10/5 0005.
 */

var crypto = require('crypto'),
    git = require('./git');
    config = require('./config');

function gitPostHandler(req, res) {
    var signature = res.headers['X-Hub-Signature'] ? res.headers['x-hub-signature'] : '',
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
    hash = crypto.createHmac('sha1', key).update(body).digest('hex');

    if(hash == sha1) {
        response = 'Going to renew byweb!'
        git.pull(path);
    }
    res.send(response)
}

module.exports.gitPostHandler = gitPostHandler;