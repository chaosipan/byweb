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

function logBase() {
    var args = ['[%s %s] : ' + arguments[1], arguments[0], getServerTime()];
    for(var i in arguments) {
        if(i > 1) {
            args.push(arguments[i]);
        }
    }
    console.log.apply(this, args);
    console.log();
}

function logH() {
    var args = ['LOG'];
    for(var i in arguments) {
        args.push(arguments[i]);
    }
    logBase.apply(args);
    logBase();
}

function errorH() {
    var args = ['ERROR'];
    for(var i in arguments) {
        args.push(arguments[i]);
    }
    logBase.apply(args);
    logBase();
}

function getServerTime() {
    var serverTime = moment().format("YYYY-MM-DD hh:mm:ss");
    return serverTime;
}