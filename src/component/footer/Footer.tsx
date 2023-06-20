import React from 'react';
import './Footer.scss';

import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/tmovie.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
            <div className="foter__content container">
                <div className="footer__contetn__logo">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <Link to="/">Movies</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
