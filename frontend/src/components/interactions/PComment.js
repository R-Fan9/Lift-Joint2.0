import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addPComment } from '../../actions/management';

export class PComment extends Component {
    state = {
        comment: '',
    }

    static propTypes = {
        addPComment: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        apost: PropTypes.array.isRequired
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { comment } = this.state;
        const com = { comment, posts:[`${this.props.apost[0].id}`] };

        this.props.isAuthenticated ? this.props.addPComment(com, this.props.apost[0].id) : this.props.history.push('/login');

        this.setState({
            comment: ''
        })
    };

    render() {
        const { comment } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <input className="form-control" type="text" name="comment" onChange={this.onChange} value={comment} maxLength="100" />
                    </div>
                    <div className='form-group'>
                        <button type="submit" className="btn btn-primary">Comment</button>
                    </div>
                </form>

                <hr className="my-2"/>

                {this.props.apost.map(p => (
                    <div className="list-group" key={p.id}>
                        {p.comments.map(c => (
                            <a className="list-group-item list-group-item-action flex-column align-items-start" key={c.id}>
                                <p className="mb-1">{ c.comment } - { c.owner.username }</p>
                            </a>
                        ))}
                    </div>
                    
                ))}
               
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    apost: state.apost
})

export default connect(mapStateToProps, { addPComment })(withRouter(PComment));