import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes, { string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ratePost } from '../../actions/management';
import ReactStars from "react-rating-stars-component";


export class PRating extends Component {

    static propTypes = {
        ratePost: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        apost: PropTypes.array.isRequired,
        user: PropTypes.object
    };

    ratingChanged = (newRating) => {
        this.props.isAuthenticated ? 
        this.props.ratePost({rating:newRating, post:this.props.apost[0].id}, this.props.apost[0].id) : 
        this.props.history.push('/login');
    };

    starsDisplay = () =>{
        var stars = [];

        for(var i = 0; i < Math.round(this.props.apost[0].ratings.map(r => r.rating).reduce((a,c) => a+c, 0)/this.props.apost[0].ratings.length); i++){
            stars.push(0);
        }

        return(
            <div className="d-flex flex-row">
                {stars.map(s => (
                    <i className="fas fa-star" style={{color:"#ffd700", fontSize:"18px"}} />
                ))}
            </div>
        )

    }

    render() {
        return (
            <div className="card card-body mt-4 mb-4">
                {this.props.apost.map(p => (
                    p.topPick === null ?
                    this.props.user === null ? 
                    <ReactStars
                        count={5}
                        onChange={this.ratingChanged.bind(this)}
                        size={24}
                        activeColor="#ffd700"
                        key={p.id}
                    />:
                    !p.ratings.some(r => r.owner.id == this.props.user.id) ?
                    <ReactStars
                        count={5}
                        onChange={this.ratingChanged.bind(this)}
                        size={24}
                        activeColor="#ffd700"
                        key={p.id}
                    />:
                    <div>
                    <h5>{Math.round((this.props.apost[0].ratings.map(r => r.rating).reduce((a,c) => a+c, 0)/this.props.apost[0].ratings.length)*10)/10}</h5>
                    {this.starsDisplay()}
                    </div>
                :
                <span>&#9949; Top Pick</span>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    apost: state.apost,
    user: state.auth.user
})

export default connect(mapStateToProps, { ratePost })(withRouter(PRating));