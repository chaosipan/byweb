/**
 * Created by Sam on 2015/12/3.
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

    return function (req, res) {
        var url = app.vc_url,
            name = app.name,
            path = app.path,
            hook = JSON.parse(req.body.hook),
            response = 'Wrong request!',
            key = app.key;

        logHelper.logH('An %s req arrival.', name);

        if (hook && hook.password == key) {
            response = 'Going to renew ' + name + '!';
            git.update(path, url, update);
        }
        res.send(hook.password)
    }
}

module.exports.generator = generator;