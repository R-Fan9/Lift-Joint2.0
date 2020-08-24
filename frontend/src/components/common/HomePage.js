import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLike, getLikes, getAQuestion, getAllQuestions } from '../../actions/management';
import { createMessage } from '../../actions/messages';

export class HomePage extends Component {
    state = {
        search: '',
        suggestQest: [],
        suggestAuth: [],
        category:''
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        allquest: PropTypes.array.isRequired,
        getAQuestion: PropTypes.func.isRequired,
        getAllQuestions: PropTypes.func.isRequired,
        addLike: PropTypes.func.isRequired,
        getLikes: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired,
        likes: PropTypes.array.isRequired,
        tags: PropTypes.array.isRequired,
    }

    componentDidMount(){
        this.props.getAllQuestions();
        this.props.getLikes();
    }

    joinLike = (ansID) => {

        const { isAuthenticated, user } = this.props.auth

        isAuthenticated ? !this.props.likes.some(like => like.owner.username == user.username) ?
        this.props.addLike({toAnswer:[ansID]}, this.props.id) : this.props.likes.some(like => like.toAnswer.includes(ansID) && like.owner.username == user.username) ?
        this.props.createMessage({ liked: "Sorry, you have liked this answer" }) : 
        this.props.addLike({toAnswer:(this.props.likes.filter(like => like.owner.username == user.username)[0].toAnswer).concat([ansID])}, this.props.id, this.props.likes.filter(like => like.owner.username == user.username)[0].id) :
        this.props.history.push('/login')
    }

    onClick = (tID) => {
        this.setState({category:tID});
    }

    onChange = e => {
        const value = e.target.value;
        let suggestQest = [];
        let suggestAuth = [];
        if (value.length > 0){
            const regex = new RegExp(`${value}`, 'i');
            suggestQest = this.props.allquest.filter( q => regex.test(q.question));
            suggestAuth = this.props.allquest.filter( q => regex.test(q.owner.username));
        }
        this.setState({search: value, suggestQest, suggestAuth });
    }

    onSubmit = e => {
        e.preventDefault();

        this.props.history.push(`/search/${ this.state.search }`);
    }

    selectedSuggest = (value) => {
        this.setState({
            search: value,
            suggestQest: [],
            suggestAuth: [],
        })
    }

    showSuggestions = () =>{
        const {suggestQest, suggestAuth} = this.state;
        if(suggestQest.length === 0 && suggestAuth === 0) {
            return null;
        }
        if(suggestQest.length > 0) {
            return (
                <div className="list-group position-absolute w-100 overflow-auto bg-white" style={{zIndex: "100", cursor:"pointer", height:"150px"}}>
                    { suggestQest.map(quest => (
                        <a className="list-group-item list-group-item-action" key={quest.id} onClick={this.selectedSuggest.bind(this, quest.question)}>{ quest.question }</a>
                    )) }
                </div>
            )
        }
        if(suggestAuth.length > 0) {
            const distinctAuth = Array.from(new Set(suggestAuth.map(a => a.owner.username))).map(n => {
                return {
                    id: suggestAuth.find(s => s.owner.username === n).id,
                    username: n
                };
            });
         
            return (
                <div className="list-group position-absolute w-100 overflow-auto bg-white" style={{zIndex: "100", cursor:"pointer", height:"150px"}}>
                    { distinctAuth.map(n => (
                        <a className="list-group-item list-group-item-action" key={n.id} onClick={this.selectedSuggest.bind(this, n.username)}>{ n.username }</a>
                    )) }
                </div>
            )
        }
    }
    render() {
        const {category, search} = this.state;
        return (
            <div className="jumbotron">
                
                <form className="form-inline my-2 float-right" onSubmit={this.onSubmit}>
                    <span className="position-relative">
                        <input className="form-control" type="text" placeholder="Search" name="search" autoComplete="off" onChange={this.onChange} value={ search }/>
                        { this.showSuggestions() }
                    </span>
                    <button className="btn btn-secondary my-2" type="submit"><i class="fas fa-search"></i></button>
                </form>

                <div className="table-responsive">
                    <table className="table">
                    <thead>
                        <tr className="btn-group btn-group-toggle" data-toggle="buttons">
                            <th>
                            <label className="btn btn-outline-dark active">
                                <input type="radio" name="options" id="all" autoComplete="off" defaultChecked onClick={this.onClick.bind(this,'')} /> All
                            </label>
                            </th>

                            {this.props.tags.sort((a,b) => b.toQuestions.length - a.toQuestions.length).map(tag => 
                                <th key={tag.id}>
                                <label className="btn btn-outline-dark">
                                    <input type="radio" name="options" id={`tag-${tag.id}`} autoComplete="off" onClick={this.onClick.bind(this, tag.id)}/> #{tag.category}
                                </label>
                                </th>
                            )}

                            <th>
                            <label className="btn btn-outline-dark active">
                                <input type="radio" name="options" id="other" autoComplete="off" onClick={this.onClick.bind(this,"o")} /> Other
                            </label>
                            </th>
                        </tr>
                    </thead>
                    </table>
                </div>

                { this.props.match.params.search ? this.props.allquest.filter(quest => quest.question.toLowerCase().includes(this.props.match.params.search.toLowerCase()) ||
                quest.owner.username.toLowerCase().includes(this.props.match.params.search.toLowerCase()) ||
                quest.answers.some(ans => ans.answer.toLowerCase().includes(this.props.match.params.search.toLowerCase())) ||
                quest.answers.some(ans => ans.owner.username.toLowerCase().includes(this.props.match.params.search.toLowerCase()))

                ).length > 0 ? 
                
                this.props.allquest.filter(quest => quest.question.toLowerCase().includes(this.props.match.params.search.toLowerCase()) ||
                quest.owner.username.toLowerCase().includes(this.props.match.params.search.toLowerCase()) ||
                quest.answers.some(ans => ans.answer.toLowerCase().includes(this.props.match.params.search.toLowerCase())) ||
                quest.answers.some(ans => ans.owner.username.toLowerCase().includes(this.props.match.params.search.toLowerCase()))
                
                ).map(quest => (
                    <div className="card border-light mt-5" key={quest.id}>

                        <div className="card-header">
                            <Link to={`/question/${quest.id}`}>
                            { quest.question } - {quest.owner.username}
                            </Link>
                            <h5>
                                {quest.tags.map(tID => <span key={tID} className="badge badge-dark mr-1 mb-1">#{this.props.tags.find(t => t.id == tID).category}</span>)}
                            </h5>
                        </div>
                        
                        { quest.answers.length > 0 ? quest.answers.map( ans => (
                            
                            <div className="list-group" key={ans.id}>
                                <div className="list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{ ans.owner.username } : </h5>
                                        <small>{ ans.created_at.slice(0,10) }</small>
                                    </div>
                                    <p className="mb-1">{ ans.answer }</p>
                                </div>
                                <div className="list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100">
                                        <button type="button" className="btn btn-primary btn-sm mr-2" onClick={ this.joinLike.bind(this, ans.id)}>
                                            Likes <span className="badge badge-light">{ ans.likes.length }</span>
                                        </button>
                                        <Link to={`/question/${quest.id}`}>
                                            <button type="button" className="btn btn-primary btn-sm">
                                                Comments <span className="badge badge-light">{ ans.comments.length }</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        )) : <div className="card-body"><Link to={`/question/${quest.id}`}><button type="button" className="btn btn-outline-primary">Answer</button></Link></div>}
                    </div>
                ) ) :   <div className="container">
                            <h1 className="display-3">OOPS! :(</h1>
                            <p className="lead">Looks like we couldn't find any mathing questions. Try again or go back to the main page</p>
                            <hr className="my-4" />
                            <p className="lead">
                                <a className="btn btn-primary btn-lg" href="#" role="button">Go Back</a>
                            </p>
                        </div> :

                !this.props.ansQs ? this.props.allquest.some(quest => quest.answers.length > 0) ? 
                this.props.allquest.some(quest => category != 'o' ? category == '' ? quest.answers.length > 0 : quest.answers.length > 0 && quest.tags.some(t => t == category) : quest.answers.length > 0 && quest.tags.length == 0) ? 
                this.props.allquest.filter(quest => category != 'o' ? category == '' ? quest.answers.length > 0 : quest.answers.length > 0 && quest.tags.some(t => t == category) : quest.answers.length > 0 && quest.tags.length == 0).sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).map(quest => (
                    <div className="card border-light mt-5" key={quest.id}>

                        <div className="card-header">
                            <Link to={`/question/${quest.id}`} onClick={ this.props.getAQuestion.bind(this, quest.id) }>
                                { quest.question } - {quest.owner.username}
                            </Link>
                            { category != 'o' ? 
                                <h5>
                                    {quest.tags.map(tID => <span key={tID} className="badge badge-dark mr-1 mb-1">#{this.props.tags.find(t => t.id == tID).category}</span>)}
                                </h5>:
                                null
                            }
                        </div>
                        
                        {quest.answers.sort((a,b) => b.likes.length - a.likes.length).map(ans => (
                            
                            <div className="list-group" key={ans.id}>
                                <div className="list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{ ans.owner.username } : </h5>
                                        <small>{ ans.created_at.slice(0,10) }</small>
                                    </div>
                                    <p className="mb-1">{ ans.answer }</p><br/>
                                    {ans.picture !== null ? <img style={{height: "20%", width: "20%", display: "block"}} src={ans.picture} className="img-fluid" alt="Card image" /> : <div/>}
                                </div>
                                <div className="list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100">
                                        <button type="button" className="btn btn-primary mr-2 btn-sm" onClick={ this.joinLike.bind(this, ans.id)}>
                                            Likes <span className="badge badge-light">{ ans.likes.length }</span>
                                        </button>
                                        <Link to={`/question/${quest.id}`}>
                                            <button type="button" className="btn btn-primary btn-sm">
                                                Comments <span className="badge badge-light">{ ans.comments.length }</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                )) : 

                category != 'o' ?
                this.props.tags.some(tag => tag.id == category && tag.toQuestions.length > 0) ?

                <div className="container">
                    <h3 className='d-block d-sm-none'>ALL QUESTIONS IN THE {this.props.tags.find(tag => tag.id == category ).category.toUpperCase()} CATEGORY ARE UNANSWERED! :(</h3>
                    <h3 className="display-4 d-none d-sm-block">ALL QUESTIONS IN THE {this.props.tags.find(tag => tag.id == category ).category.toUpperCase()} CATEGORY ARE UNANSWERED! :(</h3>
                    <hr className="my-4" />
                    <p className="lead">
                        <Link to="/answerQs"><button className="btn btn-primary btn-lg">Proceed</button></Link>
                    </p>
                </div>:

                <div className="container">
                    <h3 className='d-block d-sm-none'>THERE IS NO QUESTION IN THE {this.props.tags.find(tag => tag.id == category).category.toUpperCase()} CATEGORY YET. :)</h3>
                    <h3 className="display-4 d-none d-sm-block">THERE IS NO QUESTION IN THE {this.props.tags.find(tag => tag.id == category).category.toUpperCase()} CATEGORY YET. :)</h3>
                    <hr className="my-4" />
                </div>
                : 

                <div className="container">
                    <h3 className='d-block d-sm-none'>ALL ANSWERED QUESTIONS ARE CATEGORIZED. :)</h3>
                    <h3 className="display-4 d-none d-sm-block">ALL ANSWERED QUESTIONS ARE CATEGORIZED. :)</h3>
                    <hr className="my-4" />
                </div>
                
                :               
                <div className="container">
                    <h1 className="display-3">LET'S ANSWER SOME QUESTIONS! :)</h1>
                    <hr className="my-4" />
                    <p className="lead">
                        <Link to="/answerQs"><button type="button" className="btn btn-primary btn-lg">Proceed</button></Link>
                    </p>
                </div>:

                this.props.allquest.some(quest => quest.answers.length === 0) ? 
                this.props.allquest.some(quest => category != 'o' ? category == '' ? quest.answers.length == 0 : quest.answers.length == 0 && quest.tags.some(t => t == category) : quest.answers.length == 0 && quest.tags.length == 0) ? 
                this.props.allquest.filter(quest => category != 'o' ? category == '' ? quest.answers.length == 0 : quest.answers.length == 0 && quest.tags.some(t => t == category) : quest.answers.length == 0 && quest.tags.length == 0).sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).map(quest => (
                    <div className="card border-light mt-5" key={quest.id}>
                        <div className="card-header">
                            <Link to={`/question/${quest.id}`}>
                                { quest.question } - {quest.owner.username}
                            </Link>
                            { category != 'o' ?
                                <h5>
                                    {quest.tags.map(tID => <span key={tID} className="badge badge-dark mr-1 mb-1">#{this.props.tags.find(t => t.id == tID).category}</span>)}
                                </h5> :
                                null
                            }
                        </div>
                        <div className="card-body"><Link to={`/question/${quest.id}`}><button type="button" className="btn btn-outline-primary">Answer</button></Link></div>
                    </div>
                )) : 

                category != 'o' ?
                this.props.tags.some(tag => tag.id == category && tag.toQuestions.length > 0) ?

                <div className="container">
                    <h3 className='d-block d-sm-none'>ALL QUESTIONS IN THE {this.props.tags.find(tag => tag.id == category ).category.toUpperCase()} CATEGORY ARE ANSWERED! :)</h3>
                    <h3 className="display-4 d-none d-sm-block">ALL QUESTIONS IN THE {this.props.tags.find(tag => tag.id == category ).category.toUpperCase()} CATEGORY ARE ANSWERED! :)</h3>
                    <hr className="my-4" />
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" href="#" role="button">Proceed</a>
                    </p>
                </div>:

                <div className="container">
                    <h3 className='d-block d-sm-none'>THERE IS NO QUESTION IN THE {this.props.tags.find(tag => tag.id == category).category.toUpperCase()} CATEGORY YET. :)</h3>
                    <h3 className="display-4 d-none d-sm-block">THERE IS NO QUESTION IN THE {this.props.tags.find(tag => tag.id == category).category.toUpperCase()} CATEGORY YET. :)</h3>
                    <hr className="my-4" />
                </div>
                : 

                <div className="container">
                    <h3 className='d-block d-sm-none'>ALL UNANSWERED QUESTIONS ARE CATEGORIZED. :)</h3>
                    <h3 className="display-4 d-none d-sm-block">ALL UNANSWERED QUESTIONS ARE CATEGORIZED. :)</h3>
                    <hr className="my-4" />
                </div>
                
                :
                <div className="container">
                    <h1 className="display-3">ALL QUESTIONS ARE ANSWERED! :)</h1>
                    <hr className="my-4" />
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" href="#" role="button">Go Back</a>
                    </p>
                </div>
                
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    allquest: state.questions.allquest,
    likes: state.management.likes,
    auth: state.auth,
    tags: state.management.tags,
});


export default connect(mapStateToProps, { getAQuestion, addLike, getLikes, createMessage, getAllQuestions })(HomePage)
