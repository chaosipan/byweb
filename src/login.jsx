/**
 * Created by lizhe on 2016/5/24.
 */
let React = require('react'),
    ReactDom = require('react-dom'),
    LoginForm = require('./login/LoginForm');

ReactDom.render(
    <LoginForm />,
    document.getElementById('loginForm')
);