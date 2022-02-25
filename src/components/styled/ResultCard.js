import styled from 'styled-components';

const ResultCard = styled.div`
  background-color: #52606d;
  border-radius: 0.5rem;
  box-shadow: 0px 5px 8px 0px rgba(89, 87, 107, 0.2);
  width: 80%;
  margin: 2rem 0;
  transition-duration: 200ms;

  :hover {
    box-shadow: 0px 5px 8px 2px rgba(89, 87, 107, 0.4);
  }

  img {
    width: 100%;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  .result-album-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px 12px 12px;
    min-height: 100px;
  }

  .result-album-info p {
    margin: 0;
  }

  .result-album-title {
    font-weight: 600;
  }

  @media screen and ( min-width : 576px ) {
  
    width: 250px;
  }

  @media screen and ( min-width : 580px ) {
  
    margin: 2rem 1rem;
  }
`;

export default ResultCard;
