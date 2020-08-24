import React, { Component } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import QForm from './QForm';


export class Header extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
        allquest: PropTypes.array.isRequired
    }
    
    render() {
        const { isAuthenticated, user, token } = this.props.auth
        
        const authLinks = (
            <ul className="navbar-nav mr-auto">
                <span className="navbar-text mr-3">
                    <strong>
                        {user ? `Welcome ${user.username}` : ""}
                    </strong>
                </span>
                <li className="nav-item">
                    <Link to="/myAccount" className="nav-link">My Account</Link>
                </li>
                <li className="nav-item">
                    { token !== null ? <Link to="/" className="nav-link" onClick={this.props.logout}>Logout</Link> : 
                    <a className="nav-link" href="/api/social/logout">Logout</a>
                    }
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </ul>
        );
        
        return (
            <div>
                <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
                    <div className="container">
                        <Link to="/" className="nav-link">L &#9949; J</Link>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarColor02">
                            { isAuthenticated ? authLinks : guestLinks }

                            <Link to="/questions"><button type="button" data-toggle="collapse" data-target=".navbar-collapse.show" className="btn btn-primary my-2 my-sm-0 mr-2">Questions</button></Link>

                            <Link to="/answerQs"><button type="button" data-toggle="collapse" data-target=".navbar-collapse.show" className="btn btn-primary my-2 my-sm-0 mr-2">Answer</button></Link>

                            <button type="button" className="btn btn-primary my-2 my-sm-0 mr-2" data-toggle="modal" data-target="#question">Ask</button>

                        </div>
                    </div>
                </nav>
                <div className="modal fade" id="question" tabIndex="-1" role="dialog" aria-labelledby="questionTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="questionTitle">Ask Question</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <QForm />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = state =>({
    auth: state.auth,
    allquest: state.questions.allquest,
})

export default connect(mapStateToProps, { logout })(withRouter(Header));
