import React, { Component } from 'react';
import {  singlePost } from './apiPost';
import { Link } from 'react-router-dom';
import DefaultPost from "../images/tiger.jpg"

class SinglePost extends Component {
    state = {
        post: ""
    }

    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                this.setState({post: data})
            }
        })
    }

    renderPost = (post) => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
        const posterName = post.postedBy ? post.postedBy.name: "Inconnu";
                
                return (
                                       
                        <div className ="card-body">
                            <img src={`http://localhost:8080/post/photo/${post._id}`} 
                            alt={post.title} 
                            onError={i => i.target.src=`${DefaultPost}`} 
                            className="img-thunbnail mb-3 "
                            style={{height : "100%", width: "100%", objectFit: "cover"}}
                            />

                                <p className ="card-text">
                                    {post.body}
                                </p>
                                <br/>
                                <p className="font-italic">
                                    Publié par{" "}
                                    <Link to ={`${posterId}`}>{posterName}{" "}</Link>
                                    on{" "}{new Date(post.created).toDateString()}    
                                </p>
                                    <Link to = {"/"}>Page d'accueil</Link>
                    </div> 
            );
    }
    
    render() {
        const {post} = this.state;
        return (
            <div className="container">
                <h2 className="display-2">{post.title}</h2>
                {this.renderPost(post)}

            </div>
        )
    }
}

export default SinglePost;