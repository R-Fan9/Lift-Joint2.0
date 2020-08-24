import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getAPost, favourPost} from '../../actions/management'
import { withRouter } from 'react-router-dom';


export class IPost extends Component {
    static propTypes = {
        getAPost: PropTypes.func.isRequired,
        favourPost: PropTypes.func.isRequired,
        apost: PropTypes.array.isRequired,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object
    }

    componentDidMount(){
        this.props.getAPost(this.props.id)
    }

    goLogin(){
        this.props.history.push('/login')
    }

    favourPost(){
        const slist = this.props.apost[0].savedBy;
        slist.push(this.props.user.id);
        this.props.favourPost(this.props.apost[0].id, {savedBy:slist})
    }

    render() {
        return (
            <Fragment>
                <div className="card mt-4 mb-4">
                    <div className="card-body row d-flex justify-content-center">
                        
                        {this.props.apost.map(p => 
                            <div className="col-lg-10" key={p.id}>
                                <h1 className="card-title" style={{fontSize:"2.5vw"}}> 
                                    {p.title} 
                                    {this.props.isAuthenticated ? this.props.apost[0].savedBy.some(uID => uID == this.props.user.id) ? 
                                    <i className="fas fa-bookmark float-right"></i> : 
                                    <button type="button" className="float-right btn btn-raised btn-primary" onClick={this.favourPost.bind(this)}>
                                        <i className="far fa-bookmark"></i>
                                    </button>:
                                    <button type="button" className="float-right btn btn-raised btn-primary" onClick={this.goLogin.bind(this)}>
                                        <i className="far fa-bookmark"></i>
                                    </button>
                                    }  
                                </h1>

                                <hr />

                                <p style={{fontSize:"2vw"}}>Posted on {p.created_at.slice(0,10)} <span className="badge badge-secondary float-right">{p.group}</span></p>
                                <hr />

                                {p.content.map(c => (
                                    c.type == "txt" ?
                                    <p className="lead" key={c.Id} style={{fontSize:"2.25vw"}}>{c.text}</p> :
                                    c.type == "img" ?
                                    <img className="img-fluid mb-4" key={c.Id} src={p.images.find(i => i.imgID == c.imgID).image === null ? p.images.find(i => i.imgID == c.imgID).imgUrl : p.images.find(i => i.imgID == c.imgID).image} alt=""/>:
                                    null
                                ))}
                            </div>
                        )}
                        
                    </div>
                </div>

        
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    apost: state.apost,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});


export default connect(mapStateToProps, {getAPost, favourPost})(withRouter(IPost));
