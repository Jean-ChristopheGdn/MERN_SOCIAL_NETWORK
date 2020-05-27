import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {signin, authenticate} from '../auth';
import SocialLogin from "./SocialLogin";

class Signin extends Component {

    constructor(){
        super()
        this.state = {
            email:"",
            password:"",
            error:"",
            redirect: false,
            loading: false

        }
    }

    handleChange = (name) => (event) => {
        this.setState({error: ""});
        this.setState({[name]: event.target.value });
    }



    clickSubmit = event =>{
        event.preventDefault()
        this.setState({loading: true})
        const {email, password} = this.state
        const user = {
            email,
            password
        };
        signin(user)
        .then (data => {
            if(data.error){
                this.setState({error : data.error, loading:false})
            }
            else {
                authenticate(data, () =>{
                    this.setState({redirect: true})
  
                })
            }
        });
    };
    


    render(){

        const {email, password, error, redirect, loading } = this.state;
         if (redirect) {
             return <Redirect to = "/"/>
         }

        return (
            
            <div className="container">

                <h2 className="mt-5 mb-5">Connexion</h2>
                    <div className="alert alert-danger" style = {{ display: error ? "" : "none"}}>
                    {error}  
                    </div>
                
                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Putain ça charge ...</h2>
                    </div>
                ) : ("")
                }
                  
                <form>
                    <div>
                    <label className ="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} type = "email" className="form-control" value={email}></input>    
                    </div>
                    <div>
                    <label className ="text-muted">Mot de passe</label>
                        <input onChange={this.handleChange("password")} type = "password" className="form-control" value={password}></input>    
                    </div> 
                    <button onClick = {this.clickSubmit} className="btn btn-raised btn-primary">Se connecter</button>
                    <SocialLogin />
                </form>            
            </div>
        );
    }
}

export default Signin;