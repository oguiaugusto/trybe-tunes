import styled from 'styled-components';

const AlbumContainer = styled.div`
  color: #eee;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 3rem 0;

  .album-info {
    width: 85%;
    margin-bottom: 10px;
  }

  .album-info img {
    box-shadow: 0px 5px 8px 1px rgba(89, 87, 107, 0.4);
    width: 100%;
  }

  .album-info .album-name {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 15px 0 8px;
    margin-left: 0.2rem;
  }

  .album-info .album-artist-name {
    font-size: 1rem;
    margin: 0;
    margin-left: 0.2rem;
    color: #9aa5b1;
  }

  .songs {
    width: 85%;
  }

  .songs div:first-child hr {
    margin-top: 0;
  }

  /* .album-content .songs-container {
    align-items: center;
    display: flex;
    flex-basis: 70%;
    flex-direction: column;
    margin: 0 3rem;
  }

  .album-content .song {
    align-items: center;
    display: grid;
    grid-template-columns: 5% 40% 50% 5%;
  }

  .album-content .songs hr {
    margin: 0.8rem 0;
  }

  .album-content .song-title-container {
    display: flex;
  }

  .album-content .song-title {
    margin: auto 2rem;
    min-width: 200px;
  }

  .album-content .song-number {
    margin: auto 2rem;
  }

  .album-content .song audio {
    height: 100%;
    width: 22vw;
  }

  .song .loading {
    font-size: 1rem;
  }

  .song label {
    align-items: center;
    display: flex;
    flex-direction: column;
    font-size: xx-small;
  }

  .song .favorite-input {
    justify-self: flex-end;
    margin: 0.5rem 1rem;
  } */

  @media screen and ( min-width : 576px ) {
  
    .album-info {
      width: 450px;
    }
    
    .songs {
      margin: 0 1rem;
      min-width: 450px;
      max-width: 50%;
    }
  }

  @media screen and ( min-width : 1200px ) {
  
    .album-info {
      width: 550px;
    }

    .songs {
      width: 590px;
    }
  }
`;

export default AlbumContainer;
