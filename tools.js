/**
 * Created by Sam on 2015/10/5 0005.
 */
var crypto = require('crypto');

function hmac(algorithm, key, text, encoding) {
    var hmac = crypto.createHmac(new Buffer(algorithm), new Buffer(key));

    hmac.setEncoding(encoding);
    hmac.write(text);
    hmac.end();

    return hmac.read();
};

module.exports = {
    hmac: hmac
}