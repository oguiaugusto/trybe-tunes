import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import userDefaultImg from '../userDefaultImg.png';
import LoadingComp from './LoadingComp';
import '../css-files/profile.css';

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
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.setUser = this.setUser.bind(this);
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

  checkFields() {
    const { name, email, image, description } = this.state;

    const validations = (
      !name
      || !this.validateEmail(email)
      || !image
      || !description
    );
    /* Source: https://github.com/tryber/sd-016-a-project-trybetunes/pull/61/commits/91b9483b2aa98d5358bc1f6bebf2344fea4c5200 */

    return validations;
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
    } = this.state;

    let profImg = userDefaultImg;

    if (image !== '') profImg = image;

    const userProfileEdit = (
      <div className="profile-container">
        <form>
          <div className="img-row profile-row">
            <div className="img-container">
              <img src={ profImg } alt="Default user icon" />
            </div>
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
          <div className="name-row profile-row">
            <p className="row-title row-title-sub">Nome</p>
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
          <div className="email-row profile-row">
            <p className="row-title row-title-sub">Email</p>
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
          <div className="description-row profile-row">
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
              disabled={ this.checkFields() }
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
        <div className="profile-content">
          {loading ? <LoadingComp /> : userProfileEdit}
          {saved && <Redirect to="/profile" />}
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
