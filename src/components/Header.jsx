import React, { Component } from 'react';
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
      </header>
    );
  }
}

export default Header;
