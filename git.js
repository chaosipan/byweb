/**
 * Created by Sam on 2015/10/4 0004.
 */
var logHelper = require('./logHelper');
require('shelljs/global');

function pull(pwd) {
    cd(pwd);
    exec('git pull', function(code, output) {
        logHelper.logH('Exit code:'+ code);
        logHelper.logH('Git pull output:\n' + output);
    });
}

module.exports.pull = pull;