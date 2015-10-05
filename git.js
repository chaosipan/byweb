/**
 * Created by Sam on 2015/10/4 0004.
 */
require('shelljs/global');

function pull(pwd) {
    cd(pwd);
    exec('git pull', function(code, output) {
        console.log('Exit code:', code);
        console.log('Program output:', output);
    });
}

module.exports.pull = pull;