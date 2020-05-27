import React, {Component} from 'react';
import { list } from './apiUser';
import Avatar from '../images/Ava.jpg'
import { Link } from 'react-router-dom';
class Users extends Component {

    constructor(){
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                this.setState({users: data})
            }
        })
    }


    render (){
        const {users} = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Liste d'utilisateurs</h2>

                <div className = "row"> 
                    {users.map((user, index) => (
                        <div className="card col-md-4" key={index}>
                        <img className ="card-img-top" src={Avatar} alt={user.name}/>
                            <div className ="card-body">
                                    <h5 className ="card-title">{user.name}</h5>
                                        <p className ="card-text">
                                            {user.email}
                                        </p>
                                            <Link to={`/user/${user._id}`}>Voir le profil</Link>
                            </div>
                    </div>

                  ))
                    }
                </div>

            </div>
        )
    }
}

export default Users;