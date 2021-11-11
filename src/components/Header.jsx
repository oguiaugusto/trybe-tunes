import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo.svg';
import { getUser } from '../services/userAPI';
import LoadingComp from '../pages/LoadingComp';
import '../css-files/header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    this.setName();
  }

  setName = () => {
    getUser()
      .then((user) => {
        this.setState({ name: user.name });
      });
  }

  render() {
    const { name } = this.state;

    return (
      <header className="header" data-testid="header-component">
        <div className="header-top">
          <img src={ Logo } alt="Logo" />
          <div className="user-header">
            <div className="user-icon">
              <i className="fas fa-circle fa-user" />
            </div>
            <div className="user-name">
              {name === ''
                ? <LoadingComp /> : <p data-testid="header-user-name">{ name }</p>}
            </div>
          </div>
        </div>
        <div className="header-links">
          <ul>
            <li>
              <Link data-testid="link-to-search" to="/search">Search</Link>
            </li>
            <li>
              <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
            </li>
            <li>
              <Link data-testid="link-to-profile" to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
