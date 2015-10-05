/**
 * Created by Sam on 2015/10/4 0004.
 */
require('shelljs/global');

function pull(pwd) {
    cd(pwd);
    if (exec('git pull"').code !== 0) {
        echo('Error: Git pull failed');
    }else{
        echo('Log: Git pull successed');
    }
}

module.exports.pull = pull;