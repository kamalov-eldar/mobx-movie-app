import React, { FC, useEffect, useRef } from 'react';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import './Header.scss';
import logo from '../../assets/tmovie.png';
import { Link } from 'react-router-dom';

type HeaderProps = {};

const headerNav = [
    {
        display: 'Home',
        path: '/',
    },
    {
        display: 'Movies',
        path: '/movie',
    },
    {
        display: 'TV Series',
        path: '/tv',
    },
];

const Header = () => {
    const { pathname } = useLocation();
    const headerRef = useRef<HTMLDivElement | null>(null);
    const active = headerNav.findIndex((e) => e.path === pathname);
    useEffect(() => {
        const shrinkHeader = () => {
            if (
                document.body.scrollTop > 100 ||
                document.documentElement.scrollTop > 100
            ) {
                headerRef.current?.classList.add('shrink');
            } else {
                headerRef.current?.classList.remove('shrink');
            }
        };

        window.addEventListener('scroll', shrinkHeader);

        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="" />
                    <Link to="/">Movies</Link>
                </div>
                <ul className="header__nav">
                    {headerNav.map((e, i) => (
                        <li
                            key={i}
                            className={`${i === active ? 'active' : ''}`}
                        >
                            <Link to={e.path}>{e.display}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            Header
        </div>
    );
};

export default Header;
