import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import {read, update} from './apiUser';
import { Redirect } from "react-router-dom";



class EditProfile extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            name: "",
            email: "",
            password:"",
            error: "",
            fileSize: 0,
            redirect: false,
            about:''
        }
    }
    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token)

        .then(data => {
            if(data.error) {
                this.setState({redirect : true});
            }
            else {
                this.setState({ id: data._id, name: data.name, email: data.email, error:'', about: data.about });
            }
        });
    }

    componentDidMount() {
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value });
    }

    isValid = () => {
        const {name, email, password} = this.state
        if (name.length === 0) {
            this.setState({error: "Vous devez entrer un nom"})
            return false;
        }
        if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email)) {
            this.setState({error: "Vous devez entrer un email valide"})
            return false;
        }
        if (password.length >= 1 && password.length <= 5) {
            this.setState({error: "Le mot de passe doit contenir au minimum 6 charactères"})
            return false;
        }
        return true;
    }

    clickSubmit = event =>{
        event.preventDefault();

        if(this.isValid()) {

        const {name, email, password, error, about} = this.state
        const user = {
            name,
            email,
            password: password || undefined,
            error,
            about
        };
         //console.log(user);
         const userId = this.props.match.params.userId
         const token = isAuthenticated().token;
        update(userId, token, user)
        .then(data => {
            if(data.error){
                this.setState({error: data.error})
            }
            else {
                this.setState({
                    redirect: true
                })
            }
        });
        }

    };


    render() {
        const {id, name, email, password, redirect, error, about } = this.state;
        if (redirect) {
            return <Redirect to={`/user/${id}`}/>
        }
        return (
            
            <div className="container">
                <h2 className="mt-5 mb-5">Editer le profil</h2>
                    <div className="alert alert-danger" style = {{ display: error ? "" : "none"}}>
                        {error}  
                    </div>
    
                <form>
                    <div className="form-group">
                        <label className="text-muted">Ajouter une photo de profil</label>
                            <input
                                onChange={this.handleChange("photo")}
                                type="file"
                                accept="image/*"
                                className="form-control"
                            />
                    </div>
                    <div className="form-group">
                        <label className ="text-muted">Nom</label>
                        <input onChange={this.handleChange("name")} type = "text" className="form-control" value={name}></input>    
                    </div>
                    <div>
                        <label className ="text-muted">Email</label>
                            <input onChange={this.handleChange("email")} type = "email" className="form-control" value={email}></input>    
                    </div>
                    <div>
                        <label className ="text-muted">Mot de passe</label>
                            <input onChange={this.handleChange("password")} type = "password" className="form-control" value={password}></input>    
                    </div>
                    <div className="form-group">
                        <label className ="text-muted">Description</label>
                        <input onChange={this.handleChange("about")} type = "text" className="form-control" value={about}></input>    
                    </div>
                    <button onClick = {this.clickSubmit} className="btn btn-raised btn-primary">Mettre à jour</button>  
                </form>
            </div>
        )
    }
}

export default EditProfile;