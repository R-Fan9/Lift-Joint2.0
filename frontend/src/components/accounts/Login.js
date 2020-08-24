import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types"

export class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        const { username, password } = this.state
        e.preventDefault();
        this.props.login(username, password)
    };
    
    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/myAccount" />;
        }
        const { username, password } = this.state;
        return (
            <div className="jumbotron">
                <div className="col-md-6 m-auto">
                    <div className="card card-body mt-5">
                        <h2 className="text-center">Login</h2>
                        
                        <div className="row mt-2">
                                <div className="col-md-12"> 
                                    <a className="d-none d-sm-block btn btn-lg btn-block text-uppercase btn-outline" href="/social/login/google-oauth2/" style={{color: "#545454", backgroundColor: "#ffffff", boxShadow: "0 1px 2px 1px #ddd", fontSize:"1rem"}}>
                                        <img src="https://img.icons8.com/color/16/000000/google-logo.png"/> LogIn With Google
                                    </a>
                                    <a className="d-block d-sm-none btn btn-lg btn-block text-uppercase btn-outline" href="/social/login/google-oauth2/" style={{color: "#545454", backgroundColor: "#ffffff", boxShadow: "0 1px 2px 1px #ddd", fontSize:"0.6rem"}}>
                                        <img src="https://img.icons8.com/color/16/000000/google-logo.png" style={{height:"10%", width:"10%"}}/> LogIn With Google
                                    </a>  
                                </div>
                            </div>

                            <div style={{alignItems:"center", color:"#ccc", display:"flex", margin:"25px 0"}}>
                                <div style={{backgroundColor:"#ccc", flexGrow:"5", height:"1px"}}></div>
                                <div style={{flexGrow:"1", margin:"0 15px", textAlign:"center"}}>or</div>
                                <div style={{backgroundColor:"#ccc", flexGrow:"5", height:"1px"}}></div>
                            </div>

                            <form onSubmit={ this.onSubmit }>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input className="form-control" type="text" name="username" onChange={this.onChange} value={username} />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input className="form-control" type="password" name="password" onChange={this.onChange} value={password} />
                                </div>
                                <div className='form-group'>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                                <p>
                                    Do not have an account? <Link to='/register'>Register</Link>
                                </p>
                            </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
