import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addQuestion, getAQuestion, suggestTag } from '../../actions/management';
import { createMessage } from '../../actions/messages';
import { Link } from 'react-router-dom';


export class Form extends Component {
    state = {
        question: '',
        spec: '',
        newTag: '',
        tags: [],
        originalQuest: {id:0, question:'', owner:{username:''}},
        repeatedQest: {question: '', spec: ''},
    }

    static propTypes = {
        addQuestion: PropTypes.func.isRequired,
        getAQuestion: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired,
        suggestTag: PropTypes.func.isRequired,
        tags: PropTypes.array.isRequired,
        allquest: PropTypes.array.isRequired,
    };

    showNotice = (ogQuest, repQest) => {
        this.setState({originalQuest: ogQuest, repeatedQest: repQest});
        $('#repQ').modal('show');
    }

    onClick = (qID) => {
        this.props.getAQuestion.bind(this, qID);
        $('#repQ').modal('hide');
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { question, spec,  tags} = this.state;
        const aquest = { question, spec, tags };

        this.props.allquest.some(quest => quest.question.toLowerCase() === question.toLowerCase()) ? this.showNotice.call(this, this.props.allquest.find(quest => quest.question.toLowerCase() === question.toLowerCase()), aquest) : 
        this.props.addQuestion(aquest);

        this.setState({
            question: '',
            spec: '',
            tags:[],
        });
    };

    checkRepQest = (repQest) => {
        repQest.spec == '' ? this.props.createMessage({includeSpec:"Please include specification"}) : this.props.addQuestion.call(this, repQest)
    }

    sugTag = e => {
        e.preventDefault();
        const {newTag} = this.state;
        this.props.tags.some(tag => tag.category.toLowerCase() == newTag.toLocaleLowerCase()) ? this.props.createMessage({repTag:"Sorry, this tag already exist"}) :
        this.props.suggestTag({tag:newTag});

        this.setState({newTag:''});
    }

    addTag = (tID) => {
        const {tags} = this.state;
        tags.some(t => t == tID) ? null : (tags.push(tID), this.setState({tag:tags}))
    }

    deleteTag = (tID) => {
        const {tags} = this.state;
        tags.splice(tags.findIndex(t => t == tID), 1)
        this.setState({tags: tags});
    }

    render() {
        const { question, spec, originalQuest, repeatedQest, newTag, tags } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Ask Question</h2>
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <input className="form-control" type="text" name="question" onChange={this.onChange} value={question} placeholder="Question"/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" name="spec" onChange={this.onChange} value={spec} placeholder="Specification - Optional"/>
                    </div>

                    {tags.length > 0 ? 
                    <div className="form-group">
                        <h5>
                        {tags.map(tID => <span className="badge badge-pill badge-dark mr-1 mb-1" key={tID}>#{this.props.tags.find(tag => tag.id == tID).category} <button type="button" onClick={this.deleteTag.bind(this, tID)}>&times;</button></span>)}
                        </h5>
                    </div> : null
                    }

                    <div className="form-group">
                        <label>Add Tags (Optional)</label><br/>
                        {this.props.tags.map(tag => 
                        <button type="button" className="btn btn-outline-dark btn-sm mr-2 mb-2" key={tag.id} onClick={this.addTag.bind(this, tag.id)}>#{tag.category}</button>
                        )}
        
                    </div>

                    <div className='form-group'>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>

                <hr />

                <form onSubmit={this.sugTag}>
                    <div className="form-group">
                        <label>Suggest New Tag</label>
                        <input className="form-control" type="text" name="newTag" onChange={this.onChange} value={newTag} />
                    </div>

                    <div className='form-group'>
                        <button type="submit" className="btn btn-secondary">Submit</button>
                    </div>
                </form>

                <div className="modal fade" id="repQ" tabIndex="-1" role="dialog" aria-labelledby="repQTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="repQTitle">Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            "{ originalQuest.question }" - { originalQuest.owner.username }
                        </div>
                        <div className="modal-footer">
                            <Link to={`/question/${originalQuest.id}`} onClick={ this.onClick.bind(this, originalQuest.id) }><button type="button" className="btn btn-secondary">View original question</button></Link>
                            <button type="button" className="btn btn-primary" onClick={this.checkRepQest.bind(this, repeatedQest)} data-dismiss="modal" >Continue Asking</button>
                        </div>
                        </div>
                    </div>
                </div> 
     

            </div>

            
        )
    }
}

const mapStateToProps = state => ({
    allquest: state.questions.allquest,
    tags: state.management.tags,
})

export default connect(mapStateToProps, { addQuestion, getAQuestion, createMessage, suggestTag })(Form);