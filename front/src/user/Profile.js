import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import {read} from './apiUser';
import Avatar from '../images/Ava.jpg'
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from './ProfileTabs';



class Profile extends Component {

    constructor() {
        super()
        this.state = {
            user: {following: [], followers: []},
            redirect : false,
            following: false,
            error: "",
            post:[]
            }

    }

          // check follow
    checkFollow = user => {
        const jwt = isAuthenticated();
        const match = user.followers.find(follower => {
        // Un id a plusieurs id/followers et vice versa
        return follower._id === jwt.user._id;
        });
        return match;
    };

    clickFollowButton = callApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
    
        callApi(userId, token, this.state.user._id).then(data => {
          if (data.error) {
            this.setState({ error: data.error });
          } else {
            this.setState({ user: data, following: !this.state.following });
          }
        });
      };

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token)

        .then(data => {
            if(data.error) {
                this.setState({redirect : true});
            }
            else {
                let following = this.checkFollow(data);
                this.setState({ user: data, following });
            }
        });
    }
    

    componentDidMount() {
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId
        this.init(userId)
    }




    render() {
        const {redirect, user, posts} = this.state
        if(redirect) {
            return <Redirect to = "/signin"/>
        }
        return (

            <div className="container">
                    <h2 className="mt-5 mb-5">{user.name}</h2>
                <div className="row">
                    <div className= "col-md-6">
                        
                        <img className ="card-img-top" src={Avatar} alt={user.name}/>  
                    </div>

                    <div className="col-md-6">
                        <div className="lead">
                            <p>Email : {user.email}</p>
                            <p>{`Membre depuis : ${new Date(user.created).toDateString()}`}</p>
                        </div> 
                        {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
                            <div className="d-inline-block">
                            <Link to = {`/user/edit/${user._id}`} className="btn btn-raised btn-success mr-5">
                                Editer
                            </Link>
                                <DeleteUser userId={user._id}></DeleteUser>
                            </div>
                        ) : (
                        <FollowProfileButton 
                        following= {this.state.following}
                        onButtonClick= {this.clickFollowButton}
                        />
                        )}
                        
                    </div>
                </div>
                    <h4 className="col md-12 mt-5 mb-2">Description :</h4>
                        <div className="row">                            
                            <div className= "col md-12 mt-1 mb-5">
                                <hr />
                                    <p className="lead">{user.about}</p>
                                <hr />
                                    <ProfileTabs followers={user.followers} following={user.following} posts={posts}/>
                            </div>
                        </div>
                </div>
        )
    }
}

export default Profile;