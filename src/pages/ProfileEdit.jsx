import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import userDefaultImg from '../userDefaultImg.png';
import LoadingComp from './LoadingComp';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      saved: false,

      name: '',
      email: '',
      image: '',
      description: '',

      buttonDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.setUser = this.setUser.bind(this);
    this.changeButton = this.changeButton.bind(this);
    this.checkFields = this.checkFields.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  componentDidMount() {
    getUser()
      .then((user) => {
        this.setUser(user);
      });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      this.checkFields();
    });
  }

  onSaveClick(e) {
    e.preventDefault();
    const { name, email, image, description } = this.state;

    const userObj = { name, email, image, description };

    updateUser(userObj);

    this.setState({ loading: true, saved: true });
  }

  setUser(user) {
    const { name, email, image, description } = user;

    this.setState({
      name,
      email,
      image,
      description,
    }, () => {
      this.setState({ loading: false });
    });
  }

  changeButton(change) {
    this.setState({ buttonDisabled: change });
  }

  checkFields() {
    const { name, email, image, description } = this.state;

    const validations = [
      name === '',
      !this.validateEmail(email),
      image === '',
      description === '',
    ];

    if (!validations.every((validation) => validation === false)) {
      this.changeButton(true);
    } else {
      this.changeButton(false);
    }
  }

  validateEmail(email) {
    const validated = email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm,
    );

    return validated;
    /* Source: https://www.regextester.com/100026 */
  }

  render() {
    const { handleChange, onSaveClick } = this;
    const {
      loading,
      saved,
      name,
      email,
      image,
      description,
      buttonDisabled,
    } = this.state;

    const userProfileEdit = (
      <div className="profile-edit-container">
        <form>
          <div className="img-row">
            <img src={ userDefaultImg } alt="Default user icon" />
            <input
              data-testid="edit-input-image"
              placeholder="Insira um Link"
              className="img-input"
              type="text"
              name="image"
              value={ image }
              onChange={ handleChange }
            />
          </div>
          <div className="name-row">
            <p className="row-title">Nome</p>
            <p className="row-subtitle">
              Fique a vontade para usar seu nome social
            </p>
            <input
              data-testid="edit-input-name"
              placeholder="Como você gostaria de ser chamado(a)?"
              className="edit-form-input"
              type="text"
              name="name"
              value={ name }
              onChange={ handleChange }
            />
          </div>
          <div className="email-row">
            <p className="row-title">Email</p>
            <p className="row-subtitle">
              Escolha um email que consulte diariamente
            </p>
            <input
              data-testid="edit-input-email"
              placeholder="Seu email"
              className="edit-form-input"
              type="text"
              name="email"
              value={ email }
              onChange={ handleChange }
            />
          </div>
          <div className="description-row">
            <p className="row-title">Descrição</p>
            <textarea
              data-testid="edit-input-description"
              placeholder="Sobre mim"
              className="edit-form-textarea"
              name="description"
              value={ description }
              onChange={ handleChange }
              rows="10"
            />
          </div>
          <div className="button-row">
            <button
              data-testid="edit-button-save"
              type="button"
              className="btn blue-btn"
              disabled={ buttonDisabled }
              onClick={ onSaveClick }
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    );

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div className="profile-edit-content">
          {loading ? <LoadingComp /> : userProfileEdit}
          {saved && <Redirect to="/profile" />}
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
