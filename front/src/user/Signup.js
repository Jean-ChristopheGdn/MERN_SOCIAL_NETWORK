import React, { Component } from 'react';
import {signup} from '../auth';
import {Link} from 'react-router-dom';

class Signup extends Component {

    constructor(){
        super()
        this.state = {
            name:"",
            email:"",
            password:"",
            error:"",
            succes: false
        }
    }

    handleChange = (name) => (event) => {
        this.setState({succes: false});
        this.setState({error: ""});
        this.setState({[name]: event.target.value });
    }

    clickSubmit = event =>{
        event.preventDefault()
        const {name, email, password} = this.state
        const user = {
            name,
            email,
            password
        };
        signup(user)
        .then (data => {
            if(data.error){
                this.setState({error : data.error})
            }
            else{
                this.setState({
                    name:"",
                    email:"",
                    password:"",
                    error:"",
                    succes: true
                })
            }
        })
    };
    


    render(){

        const {name, email, password, error, succes} = this.state

        return (
            
            <div className="container">
                <h2 className="mt-5 mb-5">Inscription</h2>
                    <div className="alert alert-danger" style = {{ display: error ? "" : "none"}}>
                    {error}  
                    </div>
                    <div className="alert alert-primary" style = {{ display: succes ? "" : "none"}}>
                    Le compte a été créé avec succès. Veuillez maintenant <Link to="/signin">vous connecter</Link>. 
                    </div>
                    
                <form>
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
                    <button onClick = {this.clickSubmit} className="btn btn-raised btn-primary">S'inscrire</button>  
                </form>
            </div>
        );
    }
}

export default Signup;