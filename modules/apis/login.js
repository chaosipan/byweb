/**
 * Created by lizhe on 2016/5/22.
 */
let Q = require('q'),
    tools = require('../tools');

module.exports = function(app, data) {
    let config = data.config,
        AppModel = data.AppModel,
        User = AppModel.extend({
            tableName: 'user'
        }),
        user = new User();

    return apis = [
        {
            auth: 0,
            url: config.getUrl('login'),
            type: 'post',
            func: function(req, res) {
                let username = req.body.username,
                    password = req.body.password,
                    hash = tools.hmac('sha1', require('../../config').system.secret, password, 'utf8', 'hex');
                let deferred = Q.defer();

                user.find('first', {where: 'username="' + username + '"'}, (err, row) => {
                    if(row && row.password == hash) {
                        deferred.resolve({
                            code: 200,
                            msg: 'login success'
                        });
                        req.session.user = row;
                    }else {
                        deferred.resolve({
                            code: 510,
                            msg: 'wrong username or password'
                        });
                    }
                });

                deferred.promise
                    .then((data) => {
                        res.json(data);
                    });
            }
        }
    ];
};