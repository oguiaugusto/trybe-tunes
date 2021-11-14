import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import LoadingComp from './LoadingComp';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,

      userName: '',
      userEmail: '',
      userImg: '',
      userDescription: '',
    };

    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    getUser()
      .then((user) => {
        this.setUser(user);
      });
  }

  setUser(user) {
    const { name, email, image, description } = user;

    this.setState({
      userName: name,
      userEmail: email,
      userImg: image,
      userDescription: description,
    }, () => {
      this.setState({ loading: false });
    });
  }

  render() {
    const {
      loading,
      userName,
      userEmail,
      userImg,
      userDescription,
    } = this.state;

    const userProfile = (
      <div className="profile-container">
        <div className="img-row">
          <img
            data-testid="profile-image"
            src={ userImg }
            alt={ userName }
          />
          <div className="edit-button">
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        </div>
        <div className="name-row">
          <p className="row-title">Nome</p>
          <p className="row-content">{ userName }</p>
        </div>
        <div className="email-row">
          <p className="row-title">Email</p>
          <p className="row-content">{ userEmail }</p>
        </div>
        <div className="name-row">
          <p className="row-title">Descrição</p>
          <p className="row-content">{ userDescription }</p>
        </div>
      </div>
    );

    return (
      <div data-testid="page-profile">
        <Header />
        <div className="profile-content">
          {loading ? <LoadingComp /> : userProfile}
        </div>
      </div>
    );
  }
}

export default Profile;
