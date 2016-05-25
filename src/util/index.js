/**
 * Created by lizhe on 2016/5/25.
 */
let $ = require('jquery'),
    Q = require('q');

class Util {
    constructor() {
    }

    static loader(auth, successFunc, errorFunc) {
        if(auth) {
            this.httpGet('apis/auth')
                .then((data) => {
                    if(data.code != 200) {
                        errorFunc ? errorFunc() : () => {};
                    }else {
                        successFunc ? successFunc() : () => {};
                    }
                })
        }else {
            successFunc ? successFunc() : () => {};
        }
    }

    static httpGet(url) {
        let deferred = Q.defer();
        $.get(url, {}, deferred.resolve);
        return deferred.promise;
    }
}

module.exports = Util;