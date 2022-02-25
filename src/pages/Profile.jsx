/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Header, Loader } from '../components';
import { ProfileContainer } from '../components/styled';
import { getUser } from '../services/userAPI';
import userDefaultImg from '../userDefaultImg.png';
import '../css-files/profile.css';

function Profile() {
  const history = useHistory();
  const [user, setUser] = useState({
    name: '',
    email: '',
    image: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then((u) => { setUser(u); setLoading(false); });
  }, []);

  const profileImage = user.image || userDefaultImg;

  const renderProfile = () => (
    <ProfileContainer className="px-3 mx-2">
      <div className="img-row profile-row">
        <div className="img-container">
          <img
            data-testid="profile-image"
            src={ profileImage }
            alt={ user.name }
          />
        </div>
        <Button
          variant="outline-light"
          className="me-2"
          onClick={ () => history.push('/profile/edit') }
        >
          Edit Profile
        </Button>
      </div>
      <div className="profile-row mx-2">
        <p className="row-title">Nome</p>
        <p className="row-content">{ user.name }</p>
      </div>
      <div className="profile-row mx-2">
        <p className="row-title">Email</p>
        <p className="row-content">{ user.email }</p>
      </div>
      <div className="profile-row mx-2">
        <p className="row-title">Description</p>
        <p className="row-content">{ user.description }</p>
      </div>
    </ProfileContainer>
  );

  return (
    <div data-testid="page-profile">
      <Header />
      <div className="profile-content">
        {loading ? <div className="loader-container"><Loader /></div> : renderProfile()}
      </div>
    </div>
  );
}

export default Profile;
