import React, {Component} from 'react';
import { list } from './apiPost';
import { Link } from 'react-router-dom';
import DefaultPost from "../images/tiger.jpg"

class Posts extends Component {

    constructor(){
        super()
        this.state = {
            posts: []
        }
    }

    componentDidMount(){
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                this.setState({posts: data})
            }
        })
    }

    renderPosts = posts => {

        return (
            <div className = "row"> 
            {posts.map((post, index) => {
                const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
                const posterName = post.postedBy ? post.postedBy.name: "Inconnu";
                
                return (
                    <div className="card col-md-6" key={index}>                              
                        <div className ="card-body">
                            <img src={`http://localhost:8080/post/photo/${post._id}`} 
                            alt={post.title} 
                            onError={i => i.target.src=`${DefaultPost}`} 
                            className="img-thunbnail mb-3 "
                            style={{height : "200px", width: "auto"}}
                            />
                            <h5 className ="card-title">{post.title}</h5>
                                <p className ="card-text">
                                    {post.body.substring(0, 140)}
                                </p>
                                <br/>
                                <p className="font-italic">
                                    Publié par{" "}
                                    <Link to ={`${posterId}`}>{posterName}{" "}</Link>
                                    on{" "}{new Date(post.created).toDateString()}    
                                </p>
                                    <Link to = {`post/${post._id}`}>Détails</Link>
                                    
                        </div> 
                    </div> 
            )})}
            </div>
        )           
    }

    render (){
        const {posts} = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Publications</h2>
                {this.renderPosts(posts)}
            </div>
        )
    }
}

export default Posts;