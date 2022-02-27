/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Loader } from '../components';
import { createUser } from '../services/userAPI';
import { FilteredLogo } from '../components/styled';
import Logo from '../images/logo-dark.png';
import '../css-files/login.css';

const THREE = 3;

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedIn) history.push('/search');
  }, [history, loggedIn]);

  const joinClick = () => {
    setLoading(true);
    createUser({ name: username }).then(() => {
      setLoggedIn(true);
    });
  };

  return (
    <div data-testid="page-login" className="login">
      {
        loading ? (
          <Loader />
        ) : (
          <>
            <FilteredLogo>
              <img src={ Logo } alt="Logo" className="white" />
              <img src={ Logo } alt="Logo" />
            </FilteredLogo>
            <Form
              className="login-form d-flex flex-column"
              onSubmit={ (e) => { e.preventDefault(); joinClick(); } }
            >
              <Form.Group>
                <Form.Control
                  data-testid="login-name-input"
                  placeholder="Name"
                  className="mb-3 mt-0"
                  type="text"
                  name="username"
                  value={ username }
                  onChange={ ({ target: { value } }) => setUsername(value) }
                />
              </Form.Group>
              <Button
                variant="outline-light"
                data-testid="login-submit-button"
                className="mt-1"
                type="button"
                disabled={ username.length < THREE }
                onClick={ joinClick }
              >
                Entrar
              </Button>
            </Form>
          </>
        )
      }
    </div>
  );
}

export default Login;
