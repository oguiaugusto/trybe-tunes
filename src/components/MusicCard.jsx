import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import LoadingComp from '../pages/LoadingComp';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      songFavorite: false,
      loading: false,
      checked: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.setFavoriteSongs = this.setFavoriteSongs.bind(this);
  }

  componentDidMount() {
    getFavoriteSongs()
      .then((songs) => {
        this.setFavoriteSongs(songs);
      });
  }

  handleChange({ target: { name, checked } }) {
    this.setState({ [name]: checked });
    const { songObj } = this.props;

    if (checked) {
      this.setState({ loading: true, checked: true }, () => {
        addSong(songObj)
          .then(() => {
            this.setState({ loading: false });
          });
      });
    } else {
      this.setState({ loading: true, checked: false }, () => {
        removeSong(songObj)
          .then(() => {
            this.setState({ loading: false });
          });
      });
    }
  }

  setFavoriteSongs(songs) {
    const { trackId } = this.props;

    if (songs.some((song) => song.trackId === trackId)) {
      this.setState({ checked: true });
    }
  }

  render() {
    const { trackName, trackNumber, previewUrl, trackId } = this.props;
    const { songFavorite, loading, checked } = this.state;
    const { handleChange } = this;

    const audio = (
      <audio
        data-testid="audio-component"
        src={ previewUrl }
        controls
      >
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
      </audio>
    );

    return (
      <div className="song">
        <p className="song-title">{ `${trackNumber}` }</p>
        <p className="song-title">{ trackName }</p>
        {loading ? <LoadingComp /> : audio}
        <input
          data-testid={ `checkbox-music-${trackId}` }
          className="favorite-input"
          type="checkbox"
          id="favoriteMusic"
          checked={ checked }
          value={ songFavorite }
          onChange={ handleChange }
        />
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackNumber: PropTypes.number,
  trackId: PropTypes.number.isRequired,
  songObj: PropTypes.objectOf(PropTypes.any).isRequired,
};

MusicCard.defaultProps = {
  trackNumber: 0,
};

export default MusicCard;
