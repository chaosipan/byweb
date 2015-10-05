/**
 * Created by Sam on 2015/10/4 0004.
 */
var logHelper = require('./logHelper'),
    Thenjs = require('thenjs');

require('shelljs/global');

function pull_callback(code, output){
    logHelper.logH('Exit code:'+ code);
    logHelper.logH('git pull output:\n' + output);

    //return Thenjs(function() {});
}

function pull(pwd, tasksArray) {
    var ta = tasksArray ? tasksArray : new Array();
    console.log(tasksArray);
    cd(pwd);
    exec('git pull', {silent:true}, pull_callback);
}

module.exports = {
    pull: pull
};