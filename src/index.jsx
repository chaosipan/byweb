/**
 * Created by lizhe on 2016/5/23.
 */
let React = require('react'),
    ReactDom = require('react-dom'),
    Util = require('./util');

let Welcome = React.createClass({
    getInitialState: function(){
        return {
            username: ''
        };
    },
    handleLogout: function(){
        Util.httpGet('apis/logout')
            .then((data) => {
                alert(data.msg);
                if(data.code == 200) {
                    window.location.href = 'login.html';
                }
            })
    },
    componentDidMount: function(){
        Util.httpGet('apis/auth')
            .then((data) => {
                let user = data.data.user;
                this.setState({username: user.username});
            });
    },
    render: function(){
        return (
            <div>
                <h1>Hello, {this.state.username}</h1>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        );
    }
});

function main() {
    ReactDom.render(
        <Welcome />,
        document.getElementById('mainBody')
    );
}

Util.loader(true, main, () => {
    window.location.href = 'login.html';
});
