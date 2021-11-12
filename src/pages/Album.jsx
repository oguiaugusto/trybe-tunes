import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import '../css-files/album.css';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      songs: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    getMusics(id)
      .then((songs) => {
        this.setSongs(songs);
      });
  }

  setSongs = (songs) => {
    this.setState({ songs });
  }

  render() {
    const { songs } = this.state;
    let name = '';
    let albumName = '';
    let albumImg = '';

    if (songs[0]) {
      const { artistName, collectionName, artworkUrl100 } = songs[0];
      name = artistName;
      albumName = collectionName;

      if (artworkUrl100) {
        const biggerImg = artworkUrl100.split('100x100').join('1000x1000');
        albumImg = biggerImg;
      } else {
        albumImg = artworkUrl100;
      }
    }

    return (
      <div data-testid="page-album">
        <Header />
        <div className="album-content">
          <div className="album-container">
            <div className="album-info">
              <img src={ albumImg } alt={ `Album cover: ${albumName}` } />
              <p data-testid="album-name" className="album-name">{ albumName }</p>
              <p data-testid="artist-name" className="album-artist-name">
                { name }
              </p>
            </div>
          </div>
          <div className="songs-container">
            <div className="songs">
              <hr />
              {songs.map(({ trackName, trackNumber, previewUrl, trackId }, index) => {
                if (index !== 0) {
                  return (
                    <div key={ trackId } className="song-container">
                      <MusicCard
                        trackName={ trackName }
                        trackNumber={ trackNumber }
                        previewUrl={ previewUrl }
                      />
                      <hr />
                    </div>
                  );
                }
                return '';
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
