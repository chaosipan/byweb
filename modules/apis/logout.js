/**
 * Created by lizhe on 2016/5/25.
 */
module.exports = function(app, data) {
    let config = data.config;

    let apis = [
        {
            auth: 0,
            url: config.getUrl('logout'),
            type: 'get',
            func: function(req, res) {
                if(delete req.session.user) {
                    res.json({
                        code: 200,
                        msg: 'logout successfully'
                    });
                }else {
                    res.json({
                        code: 510,
                        msg: 'error in logout'
                    });
                }
            }
        }

    ];

    return apis;
};