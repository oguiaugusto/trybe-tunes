/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Loader, ProfileEditForm } from '../components';
import { getUser, updateUser } from '../services/userAPI';
import userDefaultImg from '../userDefaultImg.png';
import '../css-files/profile.css';

function ProfileEdit() {
  const history = useHistory();
  const [user, setUser] = useState({
    name: '',
    email: '',
    image: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getUser().then((u) => { setUser(u); setLoading(false); });
  }, []);

  useEffect(() => {
    if (saved) history.push('/profile');
  }, [history, saved]);

  const handleChange = ({ target: { name, value } }) => (
    setUser({ ...user, [name]: value })
  );

  const onSaveClick = (e) => {
    e.preventDefault();

    updateUser(user);
    setLoading(true);
    setSaved(true);
  };

  const disabledBtn = () => {
    const validEmailRegex = (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm
    );
    /* Source: https://www.regextester.com/100026 */

    return (
      !user.name
      || !user.email.match(validEmailRegex)
      || !user.image
      || !user.description
    );
    /* Source: https://github.com/tryber/sd-016-a-project-trybetunes/pull/61/commits/91b9483b2aa98d5358bc1f6bebf2344fea4c5200 */
  };

  const profileImage = user.image || userDefaultImg;

  return (
    <div data-testid="page-profile-edit">
      <Header />
      <div className="profile-content">
        {
          loading ? (
            <div className="loader-container"><Loader /></div>
          ) : (
            <ProfileEditForm
              user={ user }
              profileImage={ profileImage }
              handleChange={ handleChange }
              disabledBtn={ disabledBtn }
              onSaveClick={ onSaveClick }
            />
          )
        }
      </div>
    </div>
  );
}

export default ProfileEdit;
