import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost, getPosts, savePost } from '../../actions/management';
import { createMessage } from '../../actions/messages';


export class CreatePost extends Component {
    state = {
        title: "",
        content:[{"Id":1, "type":"txt", "text":"", "value":false}, {"Id":2, "imgID":0,"type":"img", "image":null, "imgUrl":"", "value":false}],
        group: ""
    }

    static propTypes = {
        addPost: PropTypes.func.isRequired,
        getPosts: PropTypes.func.isRequired,
        savePost: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired,
        posts: PropTypes.array.isRequired,
    };

    deleteCon = id => {
        const {content} = this.state;
        this.setState({content:content.filter(c => c.Id != id)});
    }

    onClick = type => {
        const {content} = this.state;
        if (type == "txt"){
            var newCon = {"Id":content[content.length - 1].Id + 1, "type":type, "text":"", "value":false};
        }else if(type == "img"){
            newCon = {"Id":content[content.length - 1].Id + 1, "imgID":0, "type":type, "image":null, "imgUrl":"", "value":false};
        }

        content.push(newCon);
        this.setState({content:content});
    };

    titleChange = e => this.setState({ [e.target.name]: e.target.value });

    onChange = id => {
        const { content } = this.state;
        content.find(c => c.Id == id).text = event.target.value;
        content.find(c => c.Id == id).value = true;
        this.setState({ content: content});
    };

    onSubmit = str => {
        event.preventDefault();
        
        const {title} = this.state;
        var {content} = this.state;
        const {group} = this.state;

        if(group != ""){
            content = content.filter(c => c.value);

            var count = 0
            content.filter(c => c.type == "img").map(i => {
                i.imgID = count
                count ++
            });
            var apost = {title, content, published:true, group};
    
            if(str == "submit"){
            
                this.props.posts.some(p => p.title == title) ?
                this.props.savePost(apost, this.props.posts.find(p => p.title == title).id, str) : 
                this.props.addPost(apost, str);
        
                this.setState({
                    title: "",
                    content:[{"Id":1, "type":"txt", "text":""}, {"Id":2, "imgID":0, "type":"img", "image":null, "imgUrl":""}],
                });
            }else if(str == "save"){
                apost = {title, content, published:false, group};
                this.props.posts.some(p => p.title == title) ? 
                this.props.savePost(apost, this.props.posts.find(p => p.title == title).id, str, this.props.posts.find(p => p.title == title).images) : 
                this.props.addPost(apost, str);
            }
        }else{
            this.props.createMessage({selectGroup: "Please select a group"})
        }


    };

    handleImg = id => {
        const file = event.target.files[0];
        const {content} = this.state;
        content.find(c => c.Id == id).image = file;
        content.find(c => c.Id == id).imgUrl = URL.createObjectURL(file);
        content.find(c => c.Id == id).value = true;

        this.setState({content:content});
    };

    selectGroup = (group) => {
        this.setState({group:group})
    }

    render() {
        const { title, content } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>New Post</h2>
                <br/>

                <form onSubmit={ this.onSubmit }>
                    <div className="form-group btn-group-toggle" data-toggle="buttons">
                        <label className="btn btn-outline-secondary btn-sm">
                            <input type="radio" name="options" id="option1" autoComplete="off" onClick={this.selectGroup.bind(this, "Bodybuilding")}/> Bodybuliding
                        </label>
                        <label className="btn btn-outline-secondary btn-sm">
                            <input type="radio" name="options" id="option2" autoComplete="off" onClick={this.selectGroup.bind(this, "Nutrition")}/> Nutrition
                        </label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="postTitle" className="bmd-label-floating">Title</label>
                        <input type="text" className="form-control" id="postTitle" name="title" onChange={this.titleChange} value={title} />
                    </div><br />

                    { content.map(x => 
                        x.type == "txt" ?

                        <div className="form-group" key={x.Id}>
                            <i className="fas fa-pencil-alt prefix"></i>
                            <label htmlFor="postText" className="bmd-label-floating">Text</label>
                            {x.Id != 1 ? <span className="btn float-right" onClick={this.deleteCon.bind(this, x.Id)}>&times;</span> : null}
                            <textarea className="form-control" id="postText" rows="3" name="text" onChange={this.onChange.bind(this, x.Id)} value={x.text}></textarea>
                        </div> :

                        x.type == "img" ?

                        <div className="form-group row justify-content-md-center" key={x.Id}>

                            <div className="card col col-sm-12 col-lg-6">
                                <span className="btn" onClick={this.deleteCon.bind(this, x.Id)}>&times;</span>
                                { x.image === null ?
                                    <img src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg" className="card-img-top img-fluid" alt="example placeholder" /> :
                                    <img src={x.imgUrl} className="card-img-top img-fluid" alt="example placeholder" />
                                }
                                <div className="card-body">
                                    <input type="file" onChange={this.handleImg.bind(this, x.Id)}/>
                                </div>
                            </div>

                        </div> :
                        null
                    )}

                    <div className='form-group float-left'>
                        <button type="submit" className="btn btn-outline-secondary mt-3" onClick={this.onSubmit.bind(this, "save")}>Save</button>
                    </div>

                    <div className='form-group float-right'>
                        <button type="button" className="btn btn-raised btn-primary mt-3" onClick={this.onClick.bind(this, "txt")}><i className="fas fa-plus"></i> Text</button>
                        <button type="button" className="btn btn-raised btn-dark mt-3" onClick={this.onClick.bind(this, "img")}><i className="fas fa-plus"></i> Image</button>

                        <button type="submit" className="btn btn-primary mt-3" onClick={this.onSubmit.bind(this, "submit")}>Publish</button>
                    </div>

                </form>
     

            </div>

            
        )
    }
}

const mapStateToProps = state => ({
    posts: state.management.posts
})
export default connect(mapStateToProps, { addPost, getPosts, savePost, createMessage })(CreatePost);