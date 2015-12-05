/**
 * Created by Sam on 2015/10/20.
 */

var git = require('./git'),
    logHelper = require('./logHelper'),
    tools = require('./tools'),
    Q = require('q');

function generator(obj) {
    var app = obj,
        cmdArray = app.commands;


    function update() {
        var len = cmdArray.length;
        var funcs = [];

        for (var index = 0; index < len; index ++) {
            funcs.push(runCommand);
        }

        function runCommand(cmdArray) {
            var deferred = Q.defer();
            var cmd = cmdArray.shift();

            exec(cmd, {silent: true}, function (code, output) {
                logHelper.logH('Exit code:', code);
                logHelper.logH('%s  output:\n%s', cmd, output);

                deferred.resolve(cmdArray);
            });
            return deferred.promise;
        }

        return funcs.reduce(Q.when, Q(cmdArray));
    }

    return function(req, res) {
        var signature = req.headers['x-hub-signature'] ? req.headers['x-hub-signature'] : '',
            sha1 = '',
            body = '',
            hash = '',
            url = app.vc_url,
            name = app.name,
            path = app.path,
            response  = 'Wrong request!',
            key = app.key;

        logHelper.logH('An %s req arrival.', name);

        if(signature != '') {
            sha1 = signature.split('=')[1];
        }
        body = JSON.stringify(req.body);
        hash = tools.hmac('sha1', key, body, 'utf8', 'hex');

        if(hash == sha1) {
            response = 'Going to renew ' + name + '!';
            git.update(path, url, update);
        }
        res.send(response)
    }
}

module.exports.generator = generator;