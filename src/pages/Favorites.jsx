/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { Header, Loader } from '../components';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { FavoriteContainer } from '../components/styled';
import MusicCard from '../components/MusicCard';
import '../css-files/favorites.css';

function Favorites() {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAndSetFavoriteSongs = () => (
    getFavoriteSongs().then((songs) => {
      setFavoriteSongs(songs);
      setLoading(false);
    })
  );

  useEffect(() => getAndSetFavoriteSongs(), []);

  const renderFavoriteSongs = () => (
    <div className="favorites">
      <p className="favorites-title">Favorite Songs</p>
      <div className="favorite-songs">
        {favoriteSongs.map((song) => (
          <MusicCard
            key={ song.trackId }
            song={ song }
            favoriteCard
            updateSongs={ () => getAndSetFavoriteSongs() }
          />
        ))}
        <hr />
      </div>
    </div>
  );

  return (
    <div data-testid="page-favorites">
      <Header />
      <FavoriteContainer>
        {loading ? <Loader /> : renderFavoriteSongs()}
      </FavoriteContainer>
    </div>
  );
}

export default Favorites;
