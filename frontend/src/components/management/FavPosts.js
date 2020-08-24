import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPosts } from '../../actions/management';

export class FavPosts extends Component {

    static propTypes = {
        allpost: PropTypes.array.isRequired,
        user: PropTypes.object.isRequired,
    };

    componentDidMount(){
        this.props.getAllPosts();
    }

    render() {
        return (
            <div>
                <ul className="nav nav-tabs d-flex flex-row-reverse">
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#nutrition">Nutrition</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#bbd">Bodybuilding</a>
                    </li>
                </ul>

                <div id="myTabContent" className="tab-content">
                    <div className="tab-pane fade show active" id="bbd">
                        {this.props.allpost.filter(p => p.group == "Bodybuilding" && p.savedBy.some(uID => uID == this.props.user.id)).map(p => (
                            <div className="card col col-12 p-3 p-md-5 flex-md-row mb-4" key={p.id}>
                                <div className="card-body d-flex flex-column align-items-start">
                                    <h1 className="display-4 mb-0">
                                        <Link to={`/post/${p.id}`}>
                                            {p.title}
                                        </Link>
                                    </h1>
                                    <div className="mb-1 text-muted">{p.created_at.slice(0,10)} by {p.owner.username}</div>

                                    <p className="lead my-3">
                                        {p.content.find(c => c.type == "txt").text.length > 100 ? 
                                        <span>{p.content.find(c => c.type == "txt").text.slice(0,101)}...</span> : 
                                        p.content.find(c => c.type == "txt").text}
                                    </p>
                                </div>
                                <div className="card-body col col-lg-4">
                                    {p.images.length > 0 ? 
                                    <img className="img-fluid" src={p.images[0].image === null ? p.images[0].imgUrl : p.images[0].image}/>:
                                    null
                                    }
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="tab-pane fade" id="nutrition">
                        {this.props.allpost.filter(p => p.group == "Nutrition" && p.savedBy.some(uID => uID == this.props.user.id)).map(p => (
                                <div className="card col col-12 p-3 p-md-5 flex-md-row mb-4" key={p.id}>
                                    <div className="card-body d-flex flex-column align-items-start">
                                        <h1 className="display-4 mb-0">
                                            <Link to={`/post/${p.id}`}>
                                                {p.title}
                                            </Link>
                                        </h1>
                                        <div className="mb-1 text-muted">{p.created_at.slice(0,10)} by {p.owner.username}</div>

                                        <p className="lead my-3">
                                            {p.content.find(c => c.type == "txt").text.length > 100 ? 
                                            <span>{p.content.find(c => c.type == "txt").text.slice(0,101)}...</span> : 
                                            p.content.find(c => c.type == "txt").text}
                                        </p>
                                    </div>
                                    <div className="card-body col col-lg-4">
                                        {p.images.length > 0 ? 
                                        <img className="img-fluid" src={p.images[0].image === null ? p.images[0].imgUrl : p.images[0].image}/>:
                                        null
                                        }
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
    user: state.auth.user,
    allpost: state.posts.allpost
})

export default connect(mapStateToProps, { getAllPosts })(FavPosts);