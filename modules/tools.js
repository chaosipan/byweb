/**
 * Created by Sam on 2015/10/5 0005.
 */
var crypto = require('crypto');

function hmac(algorithm, key, text, input_encoding, output_encoding) {
    var hmac = crypto.createHmac(algorithm, key),
        sign = '';

    /*hmac.setEncoding(encoding);
    hmac.write(text);
    hmac.end();*/
    sign = hmac.update(text, input_encoding).digest().toString(output_encoding);

    return sign;
};

module.exports = {
    hmac: hmac
}