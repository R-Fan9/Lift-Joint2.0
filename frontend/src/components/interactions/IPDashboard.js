import React, { Component, Fragment} from 'react'
import IPost from './IPost';
import PComment from './PComment';
import PRating from './PRating';

export class IPDashboard extends Component {
    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="jumbotron">
                        <IPost id={this.props.match.params.id}/>
                        <PRating />
                        <PComment />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default IPDashboard
