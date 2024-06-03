import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../Image/logo.jpg'
import MessageModal from './MessageModal/MessageModal';

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [modalIsOpen, setIsOpen] = useState(false);
    console.log(setIsOpen);

    function openModal() {
        console.log("object");
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const history = useHistory();
    const signOut = () => {
        setLoggedInUser({});
        localStorage.clear();
        sessionStorage.clear();
        history.push("/");
    }
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <img src={logo} width={40} height={40} alt="..." />
            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        {/* <a class="nav-link" href="/#contactUs">Contact Us</a> */}

                        <div>
                            <button
                                onClick={openModal}
                                // className="btn btn-outline-info"
                                className="btn btn-light"
                            >
                                Contact Us
                </button>
                            <MessageModal
                                modalIsOpen={modalIsOpen}
                                closeModal={closeModal}
                            />
                        </div>






                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/#aboutUs">About</a>
                    </li>
                </ul>
                {loggedInUser.isSignedIn ? <div><img className="rounded-circle mx-1" src={loggedInUser.photo} width="40px" height="40px" alt="" /><button class="btn btn-outline-success my-2 my-sm-0" onClick={signOut} >Log Out</button></div> : <Link to={{
                    pathname: "/dashboard",
                    state: 'donation'
                }}><button class="btn btn-outline-success my-2 my-sm-0">Login</button></Link>}
            </div>
        </nav>
    );
};

export default Navbar;