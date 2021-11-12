import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, trackNumber, previewUrl } = this.props;

    return (
      <div className="song">
        <p className="song-title">{ `${trackNumber}` }</p>
        <p className="song-title">{ trackName }</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackNumber: PropTypes.number,
};

MusicCard.defaultProps = {
  trackNumber: 0,
};

export default MusicCard;
