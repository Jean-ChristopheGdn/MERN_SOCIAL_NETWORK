import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const isActive = (history, path) =>{
    if(history.location.pathname === path) {
        return {color:"#ff9900"}
    }
    else {
        return {color: "#ffffff"}
    }
};


const Menu = ({history}) => (
    <div>
        <ul className="nav nav-tabs bg-primary" >
        <li className="nav-item">
        <Link className= "nav-link" style={isActive(history, "/")} to = "/">Home</Link>
        </li>


        {!isAuthenticated() && (
        <>
            <li className="nav-item">
                <Link className= "nav-link" style={isActive(history, "/signin")} to = "/signin">Connexion</Link>
            </li>
            <li className="nav-item">
                <Link className= "nav-link" style={isActive(history, "/signup")} to = "/signup">Inscription</Link>
            </li>
        </>
        )}

        {isAuthenticated() && (
        <>   
            <li className="nav-item">
                <Link className= "nav-link" style={isActive(history, "/users")} to = "/users">Rechercher</Link>
            </li>
            <li className="nav-item">
                <Link className= "nav-link" style={isActive(history, "/post/create")} to = "/post/create">Créer un Post</Link>
            </li>
            <li className="nav-item ">
                <Link to = {`/user/${isAuthenticated().user._id}`} className= "nav-link" style={isActive(history, `/user/${isAuthenticated().user._id}`)}> {`${isAuthenticated().user.name}`} </Link>
            </li>
            <li className="nav-item">
                <Link to = "/" className= "nav-link" style={isActive(history, "/signout")} onClick ={() => signout(() =>  history.push('/'))}>Déconnexion</Link>
            </li>
        </>
        )}
        
        </ul>
    </div>
)

export default withRouter(Menu);

