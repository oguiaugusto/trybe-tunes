import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import LoadingComp from './LoadingComp';
import MusicCard from '../components/MusicCard';
import '../css-files/favorites.css';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favoriteSongs: [],
      loading: true,
    };

    this.setFavoriteSongs = this.setFavoriteSongs.bind(this);
    this.removedSong = this.removedSong.bind(this);
  }

  componentDidMount() {
    this.setFavoriteSongs();
  }

  componentDidUpdate() {
    this.setFavoriteSongs();
  }

  setFavoriteSongs() {
    getFavoriteSongs()
      .then((songs) => {
        this.setState({ favoriteSongs: songs }, () => {
          this.setState({ loading: false });
        });
      });
  }

  removedSong() {
    this.setState({ loading: true }, () => {
      this.forceUpdate();
    });
  }

  render() {
    const { favoriteSongs, loading } = this.state;
    const { removedSong } = this;

    const songs = (
      <div className="favorite-container">
        <p className="favorites-title">Músicas Favoritas</p>
        <div className="favorite-songs">
          {favoriteSongs.map((songObj) => {
            const {
              trackName,
              trackNumber,
              previewUrl,
              trackId,
              artworkUrl100,
              collectionName,
            } = songObj;
            const favoriteCard = true;

            return (
              <div key={ trackId } className="song-container">
                <MusicCard
                  favoriteCard={ favoriteCard }
                  songObj={ songObj }
                  trackName={ trackName }
                  trackNumber={ trackNumber }
                  previewUrl={ previewUrl }
                  trackId={ trackId }
                  artworkUrl100={ artworkUrl100 }
                  collectionName={ collectionName }
                  removedSong={ removedSong }
                />
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    );

    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="favorites-content">
          {loading ? <LoadingComp /> : songs}
        </div>
      </div>
    );
  }
}

export default Favorites;
