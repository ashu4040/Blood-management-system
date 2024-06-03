import React from 'react';
import Main from './Main';
import Navbar from './Navbar';
import AboutUs from './AboutUs';
import './Home.css'

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Main/>
            <AboutUs/>            
        </div>
    );
};

export default Home;