import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts, deletePost, getAPost } from '../../actions/management';

export class MyPosts extends Component {

    static propTypes = {
        posts: PropTypes.array.isRequired,
        user: PropTypes.object.isRequired,
        getPosts: PropTypes.func.isRequired,
        getAPost: PropTypes.func.isRequired,
        deletePost: PropTypes.func.isRequired,
    };

    componentDidMount(){
        this.props.getPosts();
    }

    render() {
        return (
            <div>
                <ul className="nav nav-tabs d-flex flex-row-reverse">
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#saved">Saved</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#published">Published</a>
                    </li>
                </ul>

                <div id="myTabContent" className="tab-content">
                    <div className="tab-pane fade" id="saved">
                        {this.props.posts.filter(p => !p.published).map(p => (
                            <div className="card card-body mt-4 mb-4" key={p.id}>
                                <h5 className="card-title">{p.title}</h5>
                                <p className="card-text text-truncate">
                                    {p.content.find(c => c.type == "txt").text}
                                </p> 
                                {p.content.length > 1 ? <span>:</span> : null}
                
                                <div className="d-flex flex-row-reverse">
                                    <Link to={`/myPost/${p.title}`}>
                                        <button type="button" className="btn btn-outline-secondary" onClick={this.props.getAPost.bind(this, p.id)}>view</button>
                                    </Link>
                                    <button type="button" className="btn btn-danger" onClick={this.props.deletePost.bind(this, p.id)}>Delete</button>                                
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="tab-pane fade show active" id="published">
                        {this.props.posts.filter(p => p.published).map(p => (
                            <div className="card card-body mt-4 mb-4" key={p.id}>
                                <h5 className="card-title">{p.title}</h5>
                                <p className="card-text text-truncate">
                                    {p.content.find(c => c.type == "txt").text}
                                </p> {p.content.length > 1 ? <span>:</span> : null}
                                <div className="d-flex flex-row-reverse">
                                    <Link to={`/myPost/${p.title}`}>
                                        <button type="button" className="btn btn-outline-secondary" onClick={this.props.getAPost.bind(this, p.id)}>view</button>
                                    </Link>
                                    <button type="button" className="btn btn-danger" onClick={this.props.deletePost.bind(this, p.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.management.posts,
    user: state.auth.user,
})

export default connect(mapStateToProps, { getPosts, deletePost, getAPost })(MyPosts);