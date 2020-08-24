import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editComment } from '../../actions/management';

export class ECForm extends Component {
    state = {
        comment: ''
    }

    static propTypes = {
        editComment: PropTypes.func.isRequired,
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { comment } = this.state;
        var com = { comment };
        if(com.length == 0){
            com = {comment: this.props.comment}
        }

        this.props.editComment(com, this.props.cID);

        $(`#edCom`).modal('hide');

    };

    render() {
        return (
            <div className="card card-body mt-4 mb-4">
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label>Comment</label>
                        <input className="form-control" type="text" name="comment" onChange={this.onChange} defaultValue={this.props.comment} />
                    </div>
                    <div className='form-group'>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}


export default connect(null, { editComment })(ECForm);