import styled from 'styled-components';

const ProfileContainer = styled.div`
  margin: 3rem 0;
  width: 350px;
  background-color: #323f4b;
  box-shadow: 0px 5px 8px 0px rgba(89, 87, 107, 0.2);
  border-radius: 1rem;

  .profile-row {
    margin: 1rem 0;
  }

  .row-title {
    font-size: large;
    font-weight: 600;
    margin: 0;
  }

  .row-content {
    margin: 0;
  }

  .img-row {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .img-container {
    height: 120px;
    width: 120px;
  }

  .img-container img {
    border-radius: 50%;
    box-shadow: rgba(99, 99, 99, 0.3) 0 2px 8px 0;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;

export default ProfileContainer;
