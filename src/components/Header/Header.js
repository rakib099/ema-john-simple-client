import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import logo from '../../images/Logo.svg';
import './Header.css';

const Header = () => {
    const {user, logOut} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        logOut()
        .then(() => {
            navigate("/login");
        })
        .catch(error => console.error(error));
    }

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div className='nav-links'>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {
                    user?.uid ?
                    <button className='btn-logout' onClick={handleSignOut}>Log out</button>
                    :
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign up</Link>
                    </>
                }
            </div>
        </nav>
    );
};

export default Header;