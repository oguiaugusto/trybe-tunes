/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { Loader } from '.';
import Logo from '../images/logo-white.png';
import { UserHeader, HeaderLinks } from './styled';
import userDefault from '../userDefaultImg.png';
import '../css-files/header.css';

function Header() {
  const [name, setName] = useState('');

  useEffect(() => getUser().then((user) => setName(user.name)), []);

  const renderUserHeader = () => (
    <>
      <div className="user-icon">
        <img src={ userDefault } alt="user default icon" />
      </div>
      <div className="user-name">
        {
          name === ''
            ? <Loader size="sm" /> : <p data-testid="header-user-name">{ name }</p>
        }
      </div>
    </>
  );

  return (
    <header className="header" data-testid="header-component">
      <div className="header-top">
        <Link to="/">
          <img src={ Logo } alt="Logo" className="logo" />
        </Link>
        <UserHeader className="d-flex align-items-center">
          {renderUserHeader()}
        </UserHeader>
      </div>
      <HeaderLinks className="d-grid">
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </HeaderLinks>
    </header>
  );
}

export default Header;
