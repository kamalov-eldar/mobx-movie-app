import './Footer.scss';

import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/tmovie.png';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

const Footer = observer(function Footer()  {
    return (
        <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
            <div className="foter__content container">
                <div className="footer__contetn__logo">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <Link to="/">Movies</Link>
                    </div>
                </div>
                <div className="footer__content__menus">
                    <div className="footer__content__menu">
                        <Link to={'/'}>Home</Link>
                        <Link to={'/'}>Contact us</Link>
                        <Link to={'/'}>Term of services</Link>
                        <Link to={'/'}>About us</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to={'/'}>Live</Link>
                        <Link to={'/'}>FAQ</Link>
                        <Link to={'/'}>Premium</Link>
                        <Link to={'/'}>Pravacy policy</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to={'/'}>Yuo must watch</Link>
                        <Link to={'/'}>Recent release</Link>
                        <Link to={'/'}>Top IMDB</Link>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Footer;
