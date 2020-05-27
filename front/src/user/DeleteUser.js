import React, { Component } from 'react';
import { isAuthenticated } from "../auth";
import {remove} from './apiUser';
import {signout} from '../auth'; 
import { Redirect } from 'react-router-dom';

export class DeleteUser extends Component {

    state = {
        redirect: false
    }

    deleteAccount = () => {
        const token = isAuthenticated().token;
        const userId = this.props.userId
        remove(userId, token)
        .then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else{
               signout(() => console.log('Utilisateur supprimé'));
               this.setState({redirect: true}); 
            }
        })
    }

    deleteConfirmed = () => {
        let answer = window.confirm("Etes-vous sûr de vouloir supprimer ce compte ?")
        if (answer) {
            this.deleteAccount()
        }

    }

    render() {
        if(this.state.redirect) {
            return <Redirect to="/"/>
        }
        return (
        <button onClick={this.deleteConfirmed} className = "btn btn-raised btn-danger">
            Supprimer
        </button>
        )
    }
}

export default DeleteUser;