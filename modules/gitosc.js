/**
 * Created by Sam on 2015/12/3.
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
                logHelper.logH('Exit code:', code);
                logHelper.logH('%s  output:\n%s', cmd, output);

                update();
            });
        }else{
            return;
        }
    }

    return function(req, res) {
        var url = app.vc_url,
            name = app.name,
            path = app.path,
            body = JSON.stringify(req.body),
            response  = 'Wrong request!',
            key = app.key;

        logHelper.logH('An %s req arrival.', name);

        if(true) {
            response = 'Going to renew ' + name + '!';
            git.update(path, url, update);
        }
        res.send(body.password)
    }
}

module.exports.generator = generator;