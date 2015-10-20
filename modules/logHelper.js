/**
 * Created by Sam on 2015/10/5 0005.
 */
var moment = require('moment');

module.exports = {
    log: console.log,
    error: console.error,
    logH: logH,
    errorH: errorH
};

function logBase(tag, msg) {
    var args = ['[%s %s] : ' + msg, tag, getServerTime()];
    for(var i in arguments) {
        if(i > 1) {
            args.push(arguments[i]);
        }
    }
    console.log.apply(this, args);
    console.log();
}

function logH(msg) {
    logBase('LOG', msg);
}

function errorH(msg) {
    logBase('ERROR', msg);
}

function getServerTime() {
    var serverTime = moment().format("YYYY-MM-DD hh:mm:ss");
    return serverTime;
}