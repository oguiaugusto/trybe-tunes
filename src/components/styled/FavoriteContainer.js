import styled from 'styled-components';

const FavoriteContainer = styled.div`
  color: #eee;

  .loader {
    margin-top: 3rem;
  }

  .favorites {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .favorites-title {
    font-size: 2rem;
    margin: 2rem auto 10px;
    width: max-content;
  }

  .favorite-songs {
    width: 90%;
  }

  .favorite-songs .album-cover {
    border-radius: 50%;
    box-shadow: 0px 3px 5px 2px rgba(89, 87, 107, 0.3);
    width: 30px;
  }

  .favorite-songs .song-title {
    margin: 0;
    margin-right: 1rem;
    margin-top: 2.4px;
  }

  @media screen and ( min-width : 768px ) {
  
    .favorite-songs {
      width: 700px;
    }
  }
`;

export default FavoriteContainer;
