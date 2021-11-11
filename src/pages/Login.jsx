import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import LoadingComp from './LoadingComp';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      isSaving: false,
      isSaved: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.joinClick = this.joinClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  joinClick() {
    this.setState({ isSaving: true }, () => {
      const { userName } = this.state;

      createUser({ name: userName })
        .then(() => {
          this.setState({
            isSaved: true,
            isSaving: false,
          });
        });
    });
  }

  render() {
    const { handleChange, joinClick } = this;
    const { userName, isSaving, isSaved } = this.state;

    const minLength = 3;
    const canClick = userName.length < minLength;

    const loginPage = (
      <div data-testid="page-login">
        <form className="login-form">
          <input
            data-testid="login-name-input"
            placeholder="Nome"
            type="text"
            name="userName"
            value={ userName }
            onChange={ handleChange }
          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ canClick }
            onClick={ joinClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );

    return (
      <>
        {isSaving ? <LoadingComp /> : loginPage}
        {isSaved && <Redirect to="/search" />}
      </>
    );
  }
}

export default Login;