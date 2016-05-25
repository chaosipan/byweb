/**
 * Created by lizhe on 2016/5/25.
 */
module.exports = function(app, data) {
    let config = data.config,
        apis = [
            {
                auth: 1,
                url: config.getUrl('auth'),
                type: 'get',
                func: function(req, res) {
                    res.json({
                        code: 200,
                        msg: 'authed',
                        data: {
                            user: req.session.user
                        }
                    });
                }
            }
        ];

    return apis;
};