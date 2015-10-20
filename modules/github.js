/**
 * Created by Sam on 2015/10/20.
 */

var git = require('./git'),
    logHelper = require('./logHelper'),
    tools = require('./tools');

function generator(obj) {
    var app = obj,
        cmdArray = app.commands;


    function update() {
        var len = cmdArray.length;

        if(len > 0) {
            var cmd = cmdArray.shift();

            exec(cmd, {silent:true}, function(code, output) {
                logHelper.logH('Exit code:'+ code);
                logHelper.logH(cmd + ' output:\n' + output);

                update(cmdArray);
            });
        }else{
            return;
        }
    }

    return function() {
        var signature = req.headers['x-hub-signature'] ? req.headers['x-hub-signature'] : '',
            sha1 = '',
            body = '',
            hash = '',
            name = app.name,
            path = app.path,
            response  = 'Wrong request!',
            key = app.key;

        logHelper.logH('An ' + name + ' req.');

        if(signature != '') {
            sha1 = signature.split('=')[1];
        }
        body = JSON.stringify(req.body);
        hash = tools.hmac('sha1', key, body, 'utf8', 'hex');

        if(hash == sha1) {
            response = 'Going to renew ' + name + '!';
            git.pull(path, update);
        }
        res.send(response)
    }
}