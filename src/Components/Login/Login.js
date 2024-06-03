import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebase.config';
import { Link, useHistory, useLocation } from 'react-router-dom';
import LoginBg from '../Image/Login/background.png';
import { createUserWithEmailAndPassword, handleGoogleSignIn, initializeLoginFramework, signInWithEmailAndPassword, handleFbSignIn } from './LoginManager';
import { UserContext } from '../../App';
import googleimage from "../Image/Login/google-icon.png";
import fbimage from "../Image/Login/fb.png";
import './Login.css';
import logo from '../Image/logo.jpg';


const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });


    initializeLoginFramework();


    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser)
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/dashboard" } };


    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
            console.log(isPasswordValid && passwordHasNumber);
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            console.log(user);
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    // handleResponse(res, true);
                    setUser(res);
                    setLoggedInUser(res);

                })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                    // setUser(res);
                    // setLoggedInUser(res);
                    // history.replace(from);
                })
        }
        e.preventDefault();
    }


    return (
        <div className="container">
            <div className="row align-items-center" style={{ height: "100vh" }}>
                <div className="col-md-10">
                    <div className="border" >
                        <div>
                            <Link to="/">
                                <img src={logo} style={{ width: 50, height: 50 }} alt="logo" />
                            </Link>
                        </div>
                        <h4>Login</h4>
                        <form onSubmit={handleSubmit}>
                            {newUser && <input type="text" className="inputBox" name="name" onBlur={handleBlur} placeholder="Your Name" />}
                            <br />
                            <input type="text" name="email" className="inputBox" onBlur={handleBlur} placeholder="Your Email address" required />
                            <br />
                            <input type="password" name="password" className="inputBox" onBlur={handleBlur} placeholder="Password" required />
                            <br />

                            <div className="d-flex justify-content-around">
                                <div><input type="checkbox" name="userRemember" id="" />
                                    <label htmlFor="userRemember">Remember me</label></div>
                                <a href="#">Forget Password</a>
                            </div>
                            <input type="submit" className="submitBox" value={newUser ? 'Sign Up' : 'Sign In'} />
                        </form>
                        <p style={{ color: 'red' }}>{user.error}</p>
                        {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>}

                        <p className="no-account-text text-center">
                            Don't have an account?
                        <span
                                onClick={() => window.open("https://rb.gy/eibnw4", "_blank")}
                                className="create-account-link text-primary"
                            >
                                Create an Google account
                        </span>
                        </p>

                        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                        <label htmlFor="newUser">New User Sign up</label><br></br>
                        <div className="d-flex justify-content-around mb-2">
                            <button onClick={googleSignIn} className="button"><img src={googleimage} style={{ width: 20, height: 20 }} alt="" />Continue with Google</button>
                            <button onClick={fbSignIn} className="button"><img src={fbimage} style={{ width: 20, height: 20 }} alt="" />Continue with Facebook</button>
                            <br></br>
                        </div>
                    </div>
                </div>


                <div className="col-md-2 d-none d-md-block align-self-end">
                    <img className="img-fluid" src={LoginBg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Login;