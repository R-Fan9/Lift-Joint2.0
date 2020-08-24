import React, {Component, Fragment} from 'react'
import EPForm from './EPForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class EPDashboard extends Component {
    static propTypes = {
        apost: PropTypes.array.isRequired,
    }

    render() {
        return (
            <Fragment>
                <EPForm title={this.props.apost[0].title} content={this.props.apost[0].content} group={this.props.apost[0].group} />
            </Fragment>
        )
    }
}


const mapStateToProps = state => ({
    apost: state.apost
});

export default connect(mapStateToProps)(EPDashboard);

