import React, { Fragment } from 'react';
import Form from './Form';
import CreatePost from './CreatePost';
import MyPosts from './MyPosts';
import FavPosts from './FavPosts';
import Management from './management';

export default function Dashboard() {
    return (
        <Fragment>
            <div className="jumbotron">

                <ul className="nav nav-tabs">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle btn btn-secondary" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Post</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item nav-link" data-toggle="tab" href="#myPosts">My Posts</a>
                            <a className="dropdown-item nav-link" data-toggle="tab" href="#crePost">New Post</a>
                            <a className="dropdown-item nav-link" data-toggle="tab" href="#favPosts">Favourited Post</a>

                        </div>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#askQuest">Question</a>
                    </li>
                </ul>

                <div id="myTabContent" className="tab-content">
                    <div className="tab-pane fade active show" id="myPosts">
                        <MyPosts />
                    </div>
                    <div className="tab-pane fade" id="crePost">
                        <CreatePost />
                    </div>
                    <div className="tab-pane fade" id="favPosts">
                        <FavPosts />
                    </div>

                    <div className="tab-pane fade" id="askQuest">
                        <Form />
                        <Management />
                    </div>
                </div>
            </div>
        </Fragment>
            
    )
}