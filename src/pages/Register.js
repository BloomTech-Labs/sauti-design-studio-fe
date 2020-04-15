import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import OktaAuth from '@okta/okta-auth-js';
import axios from "axios";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

const Register = ({ issuer }) => {
    const history = useHistory();
    const [newUser, setNewUser] = useState(initialState);

    const handleChanges = e => {

        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const email = newUser.email;
        const password = newUser.password;
        axios.post(`${process.env.REACT_APP_BE_API_URL}/auth/okta/register`, newUser)
        .then(res=> {
            console.log("successfully created a user.", res);
            const oktaAuth = new OktaAuth({ issuer: issuer });
            oktaAuth.signIn({username: email, password: password})
                .then(res => {
                    console.log("okta response: ", res)
                    res.user.sessionToken = res.data.sessionToken;
                    axios.post(`${process.env.REACT_APP_BE_API_URL}/auth/okta/verify`, res.user)
                    .then(res=>{
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('id', res.data.id)
                    history.push(`/profile`)
                    })
                })
                .catch(err => {
                    console.log('Failed to login', err)
                });
        })
        .catch(err=>{
            console.log(err, "failed to register")
        })
    }

    return (
        <div className='loginHero'>
            <form className='oktaForm'>
                <h3 className='oktaTitle'>Let's get started</h3>
                <input className='oktaEntry' type="text" onChange={handleChanges} name="firstName" value={newUser.firstName} placeholder="first name"/>
                <input className='oktaEntry' type="text" onChange={handleChanges} name="lastName" value={newUser.lastName} placeholder="last name"/>
                <input className='oktaEntry' type="email" onChange={handleChanges} name="email" value={newUser.email} placeholder="email"/>
                <input className='oktaEntry' type="password" onChange={handleChanges} name="password" value={newUser.password} placeholder="password"/>
                <button className="oktaSubmit" onClick={handleSubmit}>Create User</button>
            </form>
        </div>
    )
}

export default Register;