/**
 * Created by lizhe on 2016/5/22.
 */
module.exports = function(app, data) {
    let config = data.config;
    return apis = [
        {
            auth: 1,
            url: config.getUrl('test'),
            type: 'get',
            func: function(req, res) {
                res.send('hello : ' + req.session.user.username);
            }
        }
    ];
};