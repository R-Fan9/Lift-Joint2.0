import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { savePost } from '../../actions/management';

export class EPForm extends Component {
    state = {
        title: this.props.title,
        content: this.props.content,
        group: this.props.group
    }

    static propTypes = {
        savePost: PropTypes.func.isRequired,
        posts: PropTypes.array.isRequired,
        apost: PropTypes.array.isRequired
    };

    componentWillMount(){
        var {content} = this.state;
        content.filter(c => c.type == "img" && typeof c.image !== 'string').map(i => i.image = this.props.apost[0].images.find(p => p.imgID == i.imgID).image);
        this.setState({content: content})
    }

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
        this.setState({content:content})
    };

    titleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChange = id => {
        var {content} = this.state;
    
        content.find(c => c.Id == id).text = event.target.value;
        content.find(c => c.Id == id).value = true;
        this.setState({content:content})

    };

    onSubmit = str => {
        event.preventDefault();
        
        const {title} = this.state;
        var {content} = this.state;
        const {group} = this.state;

        content = content.filter(c => c.value);

        var count = 0
        content.filter(c => c.type == "img").map(i => {
            i.imgID = count
            count ++
        });
        var apost = {title, content, published:this.props.apost[0].published, group};
        this.props.savePost(apost, this.props.apost[0].id, str, this.props.apost[0].images)
    };

    handleImg = id => {
        const file = event.target.files[0];
        var {content} = this.state;

        content.find(c => c.Id == id).image = file;
        content.find(c => c.Id == id).imgUrl = URL.createObjectURL(file);
        content.find(c => c.Id == id).value = true;
        
        this.setState({content:content})
    };

    selectGroup = (group) => {
        this.setState({group:group})
    }

    render() {
        const { title, content, group } = this.state;

        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Edit Post</h2>
                <br/>
                
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group btn-group-toggle" data-toggle="buttons">
                        {group == "Bodybuilding" ? 
                        <label className="btn btn-outline-secondary btn-sm active">
                            <input type="radio" name="options" id="option1" autoComplete="off" defaultChecked onClick={this.selectGroup.bind(this, "Bodybuilding")}/> Bodybuliding
                        </label> :
                        <label className="btn btn-outline-secondary btn-sm">
                            <input type="radio" name="options" id="option1" autoComplete="off" onClick={this.selectGroup.bind(this, "Bodybuilding")}/> Bodybuliding
                        </label>
                        }

                        {group == "Nutrition" ? 
                        <label className="btn btn-outline-secondary btn-sm active">
                            <input type="radio" name="options" id="option2" autoComplete="off" defaultChecked onClick={this.selectGroup.bind(this, "Nutrition")}/> Nutrition
                        </label> :
                        <label className="btn btn-outline-secondary btn-sm">
                            <input type="radio" name="options" id="option2" autoComplete="off" onClick={this.selectGroup.bind(this, "Nutrition")}/> Nutrition
                        </label>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="postTitle" className="bmd-label-floating">itle</label>
                        <input type="text" className="form-control" id="postTitle" name="title" onChange={this.titleChange} defaultValue={title != "" ? title : this.props.apost[0].title} />
                    </div><br />
                    {content.map(c => (
                        c.type == "txt" ?

                        <div className="form-group" key={c.Id}>
                            <i className="fas fa-pencil-alt prefix"></i>
                            <label htmlFor="postText" className="bmd-label-floating">Text</label>
                            {c.Id != 1 ? <span className="btn float-right" onClick={this.deleteCon.bind(this, c.Id)}>&times;</span> : null}
                            <textarea className="form-control" id="postText" rows="3" name="text" onChange={this.onChange.bind(this, c.Id)} defaultValue={c.text}></textarea>
                        </div> :

                        c.type == "img" ?

                        <div className="form-group row justify-content-md-center" key={c.Id}>
                            <div className="card col col-sm-12 col-lg-6">
                                <span className="btn" onClick={this.deleteCon.bind(this, c.Id)}>&times;</span>
                                { c.image === null ?
                                    <img src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg" className="card-img-top img-fluid" alt="example placeholder" /> :
                                    <img src={typeof c.image === 'string' ? c.image : c.imgUrl} className="card-img-top img-fluid" alt="example placeholder" />
                                }
                                <div className="card-body">
                                    <input type="file" onChange={this.handleImg.bind(this, c.Id)}/>
                                </div> 
                                
                            </div>

                        </div> :
                        null
                    ))}
                    <div className='form-group float-left'>
                        <button type="submit" className="btn btn-outline-secondary mt-3" onClick={this.onSubmit.bind(this, "save")}>Save</button>
                    </div>

                    <div className='form-group float-right'>
                        <button type="button" className="btn btn-raised btn-primary mt-3" onClick={this.onClick.bind(this, "txt")}><i className="fas fa-plus"></i> Text</button>
                        <button type="button" className="btn btn-raised btn-dark mt-3" onClick={this.onClick.bind(this, "img")}><i className="fas fa-plus"></i> Image</button>
                    </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.management.posts,
    apost: state.apost
})
export default connect(mapStateToProps, { savePost })(EPForm);