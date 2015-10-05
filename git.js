/**
 * Created by Sam on 2015/10/4 0004.
 */
var logHelper = require('./logHelper'),
    Thenjs = require('thenjs');

require('shelljs/global');

function pull_callback(code, output, tasksArray){
    logHelper.logH('Exit code:'+ code);
    logHelper.logH('git pull output:\n' + output);

    Thenjs.series(tasksArray);
}

function pull(pwd, tasksArray) {
    var ta = tasksArray ? tasksArray : [];

    cd(pwd);
    exec('git pull', pull_callback, ta);
}

module.exports = {
    pull: pull
}