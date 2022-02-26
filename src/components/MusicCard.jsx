/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Loader } from '.';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import { SongContainer, IconBtn } from './styled';

function MusicCard({ song, updateSongs, favoriteCard }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => getFavoriteSongs().then((songs) => {
    if (songs.some((s) => s.trackId === song.trackId)) setIsFavorite(true);
    setLoading(false);
  }), [song.trackId]);

  const handleFavorite = (checked) => {
    setIsFavorite(checked);
    setLoading(true);
    if (checked) {
      addSong(song).then(() => setLoading(false));
    } else {
      removeSong(song).then(() => { setLoading(false); updateSongs(); });
    }
  };

  const renderAudio = () => (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <audio
      data-testid="audio-component"
      controls
      controlsList="nodownload noplaybackrate"
    >
      <source src={ song.previewUrl } />
    </audio>
  );

  return (
    <SongContainer>
      <hr />
      <div className="song-info">
        {
          !favoriteCard ? (
            <p className="song-number">{ `${song.trackNumber}` }</p>
          ) : (
            <img
              className="album-cover"
              src={ song.artworkUrl100.split('100x100').join('500x500') }
              alt={ song.collectionName }
            />
          )
        }
        <p className="song-title">{ song.trackName }</p>
        <IconBtn
          type="button"
          data-testid={ `checkbox-music-${song.trackId}` }
          onClick={ () => handleFavorite(!isFavorite) }
        >
          {isFavorite ? <AiFillHeart size={ 20 } /> : <AiOutlineHeart size={ 20 } />}
        </IconBtn>
      </div>
      {loading ? <Loader /> : renderAudio()}
    </SongContainer>
  );
}

MusicCard.propTypes = {
  song: PropTypes.objectOf(PropTypes.any).isRequired,
  favoriteCard: PropTypes.bool,
  updateSongs: PropTypes.func,
};

MusicCard.defaultProps = {
  favoriteCard: false,
  updateSongs: () => {},
};

export default MusicCard;
