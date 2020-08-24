import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {publishPost} from '../../actions/management'

import { withRouter } from 'react-router-dom';


export class Post extends Component {
    static propTypes = {
        apost: PropTypes.array.isRequired,
        publishPost: PropTypes.func.isRequired,
    }

    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="jumbotron">
                        <div className="card mt-4 mb-4">
                            <div className="card-body row d-flex justify-content-center">
                                
                                {this.props.apost.map(p => 
                                    <div className="col-lg-10" key={p.id}>
                                        <h1 className="card-title"> 
                                            {p.title} 
                                            <Link to={`/editPost/${p.title}`}>
                                            <button type="button" className="btn btn-raised btn-secondary float-right d-none d-lg-block">
                                                Edit
                                            </button>
                                            </Link>
                                            {!p.published ? 
                                            <button type="button" className="mr-2 btn btn-raised btn-primary float-right d-none d-lg-block" onClick={this.props.publishPost.bind(this, {published:true}, p.id)}>
                                                Publish
                                            </button>:
                                            null}
                                            <div className="dropdown d-lg-none float-right">
                                                <button className="btn bmd-btn-icon dropdown-toggle" type="button" id="ex1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="material-icons">more_vert</i>
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="ex1">
                                                    <Link to={`/editPost/${p.title}`}>
                                                    <button type="button" className="dropdown-item">
                                                        Edit
                                                    </button>
                                                    </Link>
                                                    {!p.published ? 
                                                    <button type="button" className="dropdown-item" onClick={this.props.publishPost.bind(this, {published:true}, p.id)}>
                                                        Publish
                                                    </button>:
                                                    null}
                                                </div>
                                            </div>
                                        </h1>

                                        <hr />

                                        <p>Posted on {p.created_at.slice(0,10)} <span class="badge badge-secondary float-right">{p.group}</span></p>
                                        <hr />

                                        {p.content.map(c => (
                                            c.type == "txt" ?
                                            <p className="lead" key={c.Id} style={{fontSize:"2vw"}}>{c.text}</p> :
                                            c.type == "img" ?
                                            <img className="img-fluid mb-4" key={c.Id} src={p.images.find(i => i.imgID == c.imgID).image === null ? p.images.find(i => i.imgID == c.imgID).imgUrl : p.images.find(i => i.imgID == c.imgID).image} alt=""/>:
                                            null
                                        ))}
                                    </div>
                                )}
                                
                            </div>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    apost: state.apost
});

export default connect(mapStateToProps, {publishPost})(withRouter(Post));
