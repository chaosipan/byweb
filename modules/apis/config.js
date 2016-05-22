/**
 * Created by lizhe on 2016/5/22.
 */
module.exports = {
    base_url: 'apis',
    getUrl: function(param) {
        return '/' + this.base_url + '/' + param;
    },
    modules_path: './modules/apis',
    getModule: function(param) {
        return './' + param;
    }
};