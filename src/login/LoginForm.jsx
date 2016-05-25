/**
 * Created by lizhe on 2016/5/25.
 */
let React = require('react'),
    $ = require('jquery');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            username: '',
            password: ''
        };
    },
    handleLogin: function() {
        $.post('/apis/login', {
            username: this.state.username,
            password: this.state.password
        }, (data) => {
            if (data.code == 200) {
                alert(data.msg);
                window.location.href = 'index.html';
            } else {
                alert(data.msg);
            }
        }).fail((xhr, textStatus, errorThrown) => {
            console.log(xhr.responseText);
        });
    },
    handleUsernameChange: function(e){
        this.setState({username: e.target.value});
    },
    handlePasswordChange: function(e){
        this.setState({password: e.target.value});
    },
    render: function(){
        return (
            <form>
                <div className="form-group has-feedback">
                    <input name="username" type="text" className="form-control" placeholder="Username" onChange={this.handleUsernameChange}/>
                    <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                </div>
                <div className="form-group has-feedback">
                    <input name="password" type="password" className="form-control" placeholder="Password" onChange={this.handlePasswordChange}/>
                    <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                </div>
                <div id="example"></div>
                <div className="row">
                    <div className="col-xs-8">
                        <div className="checkbox icheck">
                            <label>
                                <input type="checkbox"/> Remember Me
                            </label>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <button type="button" className="btn btn-primary btn-block btn-flat" onClick={this.handleLogin}>Sign In</button>
                    </div>
                </div>
            </form>
        );
    }
});