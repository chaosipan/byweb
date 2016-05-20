/**
 * Created by Sam on 2015/12/3.
 */

let git = require('./git'),
    logHelper = require('./logHelper'),
    tools = require('./tools'),
    Q = require('q');

function generator(obj) {
    let app = obj,
        cmdArray = app.commands;


    function update() {
        let len = cmdArray.length,
            cmds = cmdArray,
            funcs = [];

        for (let index = 0; index < len; index ++) {
            funcs.push(runCommand);
        }

        function runCommand(index) {
            let deferred = Q.defer(),
                cmd = cmds[index++];

            exec(cmd, {silent: true}, function (code, output) {
                if(parseInt(code) == 0) {
                    logHelper.logH('Exit code:', code);
                    logHelper.logH('%s  output:\n%s', cmd, output);
                }else {
                    logHelper.errorH('Exit code:', code);
                    logHelper.errorH('%s  output:\n%s', cmd, output);
                }

                deferred.resolve(index);
            });
            return deferred.promise;
        }

        return funcs.reduce(Q.when, Q(0));
    }

    return function (req, res) {
        let url = app.vc_url,
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