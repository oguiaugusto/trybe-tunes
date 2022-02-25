import styled from 'styled-components';

const UserHeader = styled.div`
  background-color: #eee;
  color: #252525;
  border-radius: 2rem;
  padding: 0.2rem;
  width: max-content;

  .user-name {
    margin: 0 15px;
  }

  .user-name p {
    margin: 0;
  }

  .user-icon {
    align-items: center;
    border-radius: 50%;
    display: flex;
    height: 20px;
    justify-content: center;
    padding: 5px;
    width: 20px;
  }

  img {
    width: 20px;
    margin-left: 5px;
  }

  .user-name .loader {
    height: 23.975px;
  }

  .user-name .loader .spinner-border {
    color: #52606d !important;
  }
`;

export default UserHeader;
