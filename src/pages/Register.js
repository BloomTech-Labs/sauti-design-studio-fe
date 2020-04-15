import React, {useState, useRef} from "react";
import {useHistory} from "react-router-dom";
import  {useForm} from 'react-hook-form'
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
    const {handleSubmit, register, errors, watch} = useForm();
    const password = useRef({})
    password.current = watch("password", "");
    // const handleChanges = e => {

    //     setNewUser({
    //         ...newUser,
    //         [e.target.name]: e.target.value
    //     })
    // }

    const  onSubmit = values => {
        const email = values.email;
        const password = values.password;
        axios.post(`${process.env.REACT_APP_BE_API_URL}/auth/okta/register`, values)
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
            <form className='oktaForm' onSubmit={handleSubmit(onSubmit)}>
                <h3 className='oktaTitle'>Let's get started</h3>
                <input className='oktaEntry' type="text"  name="firstName"  placeholder="first name" ref={register({ required: true})}/>
                    {errors.firstName && "First name is a required field"}
                <input className='oktaEntry' type="text"  name="lastName" placeholder="last name" ref={register({ required: true})}/>
                    {errors.lastName && "Last name is a required field"}
                <input className='oktaEntry' type="email"  name="email" placeholder="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })}/> 
                    {errors.email && "Please use a valid email address"}
                <input className='oktaEntry' type="password"  name="password" placeholder="password" ref={register({ required: true, minLength:{ value: 8, message: "Password must have at least 8 characters"}, pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/i, message: " your password must contain at least one upper case letter, one lower case letter and one number" }  })}/>
                    {console.log("this is errors", errors)}
                    {errors.password && `${errors.password.message}`}
                <input className='oktaEntry' type="password"  name="confirmPassword" placeholder="confirm password" ref={register({ required: true, validate: (value) => { return value === password.current || "The passwords do not match"}})} />
                    {errors.confirmPassword && `Must match the password`}
                <button className="oktaSubmit">Create User</button>
            </form>
        </div>
    )
}

export default Register;