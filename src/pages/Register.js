import React, {useState, useRef} from "react";
import {useHistory} from "react-router-dom";
import  {useForm} from 'react-hook-form'
import Loader from 'react-loader-spinner'
import OktaAuth from '@okta/okta-auth-js';
import axios from "axios";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer.js';

// const initialState = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: ""
// }

const Register = ({ issuer }) => {
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    // const [newUser, setNewUser] = useState(initialState);
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
        setLoading(true)
        axios.post(`${process.env.REACT_APP_BE_API_URL}/auth/okta/register`, values)
        .then(res=> {
            console.log("successfully created a user.", res);
            const oktaAuth = new OktaAuth({ issuer: issuer });
            oktaAuth.signIn({username: email, password: password})
                .then(res => {
                    res.user.sessionToken = res.data.sessionToken;
                    axios.post(`${process.env.REACT_APP_BE_API_URL}/auth/okta/verify`, res.user)
                    .then(res=>{
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('id', res.data.id)
                    setLoading(false)
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
        <>
        <Navbar />
        <div className='loginHero'>
         { loading ? <span className="Loader-div oktaForm"><Loader type="TailSpin" color="darkred" height={500} width={500}/></span> : ( <form className='oktaForm' onSubmit={handleSubmit(onSubmit)}>
                <h3 className='oktaTitle'>Create an Account</h3>
                <span className="inputLabelSpan">
                    <label className="inputLabel" htmlFor="firstName">First Name</label>
                <input className='oktaLoginInput' title="Enter a First Name" id="firstName" type="text"  name="firstName"  placeholder="first name" ref={register({ required: true})}/>
                </span>
                    {errors.firstName && <span className="oktaError">First name is a required field</span>}
                <span className="inputLabelSpan">
                <label className="inputLabel" htmlFor="lastName">Last Name</label>
                <input className='oktaLoginInput' title="Enter a Last Name" id="lastName" type="text"  name="lastName" placeholder="last name" ref={register({ required: true})}/>
                </span>
                    {errors.lastName &&  <span className="oktaError">Last name is a required field</span>}
                <span className="inputLabelSpan">
                <label className="inputLabel" htmlFor="email">Email</label>
                <input className='oktaLoginInput' title="Enter an Email" id="email" type="email"  name="email" placeholder="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })}/></span>
                    {errors.email && <span className="oktaError">Please use a valid email address</span>}
                <span className="inputLabelSpan">
                <label className="inputLabel" htmlFor="password">Password</label>
                <input className='oktaLoginInput' title="Enter a Password" id="password" type="password"  name="password" placeholder="password" ref={register({ required: true, minLength:{ value: 8, message: "Passwords must have at least 8 characters"}, pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/i, message: "Passwords must contain at least one upper case letter, one lower case letter, and one number." }  })}/></span>
                    {errors.password && <span className="oktaError">{errors.password.message}</span>}
                <span className="inputLabelSpan">
                <label className="inputLabel" htmlFor="confirmP">Confirm Password</label>
                <input className='oktaLoginInput' id="confirmP" title="Confirm Password" type="password"  name="confirmPassword" placeholder="confirm password" ref={register({ required: true, validate: (value) => { return value === password.current || "The passwords do not match"}})} /></span>
                    {errors.confirmPassword && <span className="oktaError">Must match the password</span>}
                    <p className='password-reqs'>Passwords must have at least 8 characters, include a number, a capital letter, and a lowercase letter.<br/> <span className='emphasize'>    Passwords cannot contain part of email.</span></p>
                <button className="oktaSubmit">Sign Up</button>
                <p style={{color:"white", textAlign:"center", margin:"1%"}}>Already have an account? <span style={{textDecoration:"underline", cursor: "pointer"}} onClick={()=>history.push('/login')}>Click here to sign in.</span></p>
            </form>) }
        </div>
        <Footer />
        </>
    )
}

export default Register;