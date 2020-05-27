import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class ProfileTabs extends Component {
    render() {
        const {following, followers} = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <h4 className="text-primary">Abonnés</h4>
                        <hr />
                        {followers.map((person, index) => (
         
                            <div key={index}>
                                <div className="row">
                                    <div>
                                        <Link to={`/user/${person._id}`}>{person.name}</Link>
                                    </div>
                                </div>
                             </div>       
                        ))}
                    </div>
                    <div className="col-md-4">
                        <h4 className="text-primary">Abonnement</h4>
                        <hr />
                        {following.map((person, index) => (
                            <div key={index}>
                                <div className="row">
                                    <div>
                                        <Link to={`/user/${person._id}`}>
                                            <div>{person.name}</div>
                                        </Link>
                                    </div>

                                </div>

                            </div>
                        ))}
                    </div>
                    {/* <div className="col-md-4">
                        <h4 className="text-primary">Posts</h4>
                        <hr />
                        {posts.map((post, i) => (
                            <div key={i}>
                                <div className="row">
                                    <div>
                                        <Link to={`/post/${post._id}`}>
                                            {post.title}
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>

            
            )
        }
    }


export default ProfileTabs;

