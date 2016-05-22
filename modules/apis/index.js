/**
 * Created by lizhe on 2016/5/22.
 */
let fs = require('fs'),
    config = require('./config');

module.exports = function(app, AppModel) {
    let files = fs.readdirSync(config.modules_path),
        data = {
            config: config,
            AppModel: AppModel
        };

    for(let i in files) {
        let file = files[i];
        if(file == 'index.js' || file == 'config.js') {
            continue;
        }

        initApis(require(config.getModule(file))(app, data));
    }

    function initApis(apis) {
        for(let i in apis) {
            let api = apis[i];
            if(api.auth > 0) {
                app.use(api.url, (req, res, next) => {
                    if(req.session.user) {
                        next();
                    }else {
                        res.send('Please login first!');
                    }
                })
            }

            switch(api.type) {
                case 'get':
                    app.get(api.url, api.func);
                    break;
                case 'post':
                    app.post(api.url, api.func);
                    break;
            }
        }
    }
};