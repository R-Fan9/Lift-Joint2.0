import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPosts } from '../../actions/management';

export class PostPage extends Component {

    static propTypes = {
        getAllPosts: PropTypes.func.isRequired,
        allpost: PropTypes.array.isRequired,
    }

    componentDidMount(){
        this.props.getAllPosts();
    }

    render() {
        return (
            <div className="jumbotron">
                <ul className="nav nav-tabs d-flex justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#bbd">Bodybuilding</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#nutrition">Nutrition</a>
                    </li>
                </ul>

                <div id="myTabContent" className="tab-content">
                    <div className="tab-pane fade active show" id="bbd">
                        <div className="row">
                            {this.props.allpost.filter(p => p.group == "Bodybuilding" && p.topPick !== null).sort((a,b) => a.topPick - b.topPick).map(p => (
                                p.topPick == 1 ? 
                                <div className="card col col-12 p-3 p-md-5 flex-md-row mb-4 text-white bg-dark" key={p.id}>
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

                                        <p className="lead mb-0">
                                            <Link to={`/post/${p.id}`}>
                                                <span className="text-white font-weight-bold">Continue reading...</span>
                                            </Link>
                                        </p>
                                    </div>
                                    <div className="card-body col col-lg-4">
                                        {p.images.length > 0 ? 
                                        <img className="img-fluid" src={p.images[0].image === null ? p.images[0].imgUrl : p.images[0].image}/>:
                                        null
                                        }
                                    </div>
                                </div>:
                                <div className="card col-md-6 p-md-3 flex-md-row mb-2 mx-auto" key={p.id}>
                                    <div className="card-body d-flex flex-column align-items-start">
                                        <h3 className="mb-0">
                                            <Link to={`/post/${p.id}`}>
                                                {p.title}
                                            </Link>
                                        </h3>
                                        <div className="mb-1 text-muted">{p.created_at.slice(0,10)} by {p.owner.username}</div>
                                        <p className="lead my-3">
                                            {p.content.find(c => c.type == "txt").text.length > 100 ? 
                                            <span>{p.content.find(c => c.type == "txt").text.slice(0,101)}...</span> : 
                                            p.content.find(c => c.type == "txt").text}
                                        </p>
                                        <p className="lead mb-0">
                                            <Link to={`/post/${p.id}`}>
                                                Continue reading...
                                            </Link>
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
                        <p className="lead mt-2 mb-4">
                            <span className="d-flex flex-row-reverse">&#9949; Top Picks</span>
                        </p>
                        <hr />
                        <div className="row">
                            {this.props.allpost.filter(p => p.group == "Bodybuilding" && p.topPick === null).sort((x,y) => Math.round((y.ratings.map(r => r.rating).reduce((a,c) => a+c, 0)/y.ratings.length)*10)/10 - Math.round((x.ratings.map(r => r.rating).reduce((a,c) => a+c, 0)/x.ratings.length)*10)/10).map(p => (
                                <div className="card col-md-4 mb-4 mx-auto" key={p.id}>
                                    <div className="card-header">
                                        {p.created_at.slice(0,10)} by {p.owner.username}
                                        <i className="fas fa-star float-right d-flex align-items-start flex-column" style={{color:"#ffd700", fontSize:"18px"}}>
                                            <span className="badge badge-dark mt-1">{p.ratings.length > 0 ? Math.round((p.ratings.map(r => r.rating).reduce((a,c) => a+c, 0)/p.ratings.length)*10)/10 : null}</span>
                                        </i>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{p.title}</h5>
                                        <p className="card-text my-3">
                                            {p.content.find(c => c.type == "txt").text.length > 100 ? 
                                            <span>{p.content.find(c => c.type == "txt").text.slice(0,101)}...</span> : 
                                            p.content.find(c => c.type == "txt").text}
                                        </p>
                                        <p className="card-text mb-0">
                                            <Link to={`/post/${p.id}`}>
                                                Continue reading...
                                            </Link>
                                        </p>                                    
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="tab-pane fade" id="nutrition">
                        <div className="row">
                            {this.props.allpost.filter(p => p.group == "Nutrition" && p.topPick !== null).sort((a,b) => a.topPick - b.topPick).map(p => (
                                p.topPick == 1 ? 
                                <div className="card col col-12 p-3 p-md-5 flex-md-row mb-4 text-white bg-dark" key={p.id}>
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

                                        <p className="lead mb-0">
                                            <Link to={`/post/${p.id}`}>
                                                <span className="text-white font-weight-bold">Continue reading...</span>
                                            </Link>
                                        </p>
                                    </div>
                                    <div className="card-body col col-lg-4">
                                        {p.images.length > 0 ? 
                                        <img className="img-fluid" src={p.images[0].image === null ? p.images[0].imgUrl : p.images[0].image}/>:
                                        null
                                        }
                                    </div>
                                </div>:
                                <div className="card col-md-6 p-md-3 flex-md-row mb-2 mx-auto" key={p.id}>
                                    <div className="card-body d-flex flex-column align-items-start">
                                        <h3 className="mb-0">
                                            <Link to={`/post/${p.id}`}>
                                                {p.title}
                                            </Link>
                                        </h3>
                                        <div className="mb-1 text-muted">{p.created_at.slice(0,10)} by {p.owner.username}</div>
                                        <p className="lead my-3">
                                            {p.content.find(c => c.type == "txt").text.length > 100 ? 
                                            <span>{p.content.find(c => c.type == "txt").text.slice(0,101)}...</span> : 
                                            p.content.find(c => c.type == "txt").text}
                                        </p>
                                        <p className="lead mb-0">
                                            <Link to={`/post/${p.id}`}>
                                                Continue reading...
                                            </Link>
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
                        <p className="lead mt-2 mb-4 ">
                        <span className="d-flex flex-row-reverse">&#9949; Top Picks</span>
                        </p>
                        <hr />
                        <div className="row">
                            {this.props.allpost.filter(p => p.group == "Nutrition" && p.topPick === null).sort((x,y) => Math.round((y.ratings.map(r => r.rating).reduce((a,c) => a+c, 0)/y.ratings.length)*10)/10 - Math.round((x.ratings.map(r => r.rating).reduce((a,c) => a+c, 0)/x.ratings.length)*10)/10).map(p => (
                                <div className="card col-md-4 mb-4 mx-auto" key={p.id}>
                                    <div className="card-header">
                                        {p.created_at.slice(0,10)} by {p.owner.username}
                                        <i className="fas fa-star float-right d-flex align-items-start flex-column" style={{color:"#ffd700", fontSize:"18px"}}>
                                            <span className="badge badge-dark mt-1">{p.ratings.length > 0 ? Math.round((p.ratings.map(r => r.rating).reduce((a,c) => a+c, 0)/p.ratings.length)*10)/10 : null}</span>
                                        </i>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{p.title}</h5>
                                        <p className="card-text my-3">
                                            {p.content.find(c => c.type == "txt").text.length > 100 ? 
                                            <span>{p.content.find(c => c.type == "txt").text.slice(0,101)}...</span> : 
                                            p.content.find(c => c.type == "txt").text}
                                        </p>
                                        <p className="card-text mb-0">
                                            <Link to={`/post/${p.id}`}>
                                                Continue reading...
                                            </Link>
                                        </p>                                    
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

      
            </div>
        )
    }
}

const mapStateToProps = state => ({
    allpost: state.posts.allpost,
});

export default connect(mapStateToProps, { getAllPosts })(PostPage)
