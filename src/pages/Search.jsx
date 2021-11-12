import React, { Component } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import AlbumResult from '../components/AlbumResult';
import LoadingComp from './LoadingComp';
import '../css-files/search.css';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      loading: false,
      hasResults: false,
      shownName: '',

      albums: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchArtist = this.searchArtist.bind(this);
    this.mapAlbums = this.mapAlbums.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  searchArtist(e) {
    if (!e.key || e.key === 'Enter') {
      const { artistName } = this.state;
      this.setState({ loading: true });
      searchAlbumsAPI(artistName)
        .then((albums) => {
          this.setState({
            loading: false,
            hasResults: true,
            shownName: artistName,
            albums,
          }, () => {
            this.setState({ artistName: '' });
          });
        });
    }
  }

  mapAlbums(albums) {
    return albums.map((album) => {
      const {
        artistName: aName,
        collectionName,
        collectionId,
        artworkUrl100,
      } = album;

      return (
        <AlbumResult
          key={ collectionId }
          id={ collectionId }
          artistName={ aName }
          imageSourceSmall={ artworkUrl100 }
          albumName={ collectionName }
        />
      );
    });
  }

  render() {
    const { handleChange, searchArtist, mapAlbums } = this;
    const { artistName, loading, hasResults, shownName, albums } = this.state;

    const minLength = 2;
    const isClickable = artistName.length < minLength;

    const searchContainer = (
      <div className="search-container">
        <div className="search-input">
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Nome do Artista"
            className="form-input"
            name="artistName"
            value={ artistName }
            onChange={ handleChange }
            onKeyPress={ searchArtist }
          />
          <i className="fas fa-search" />
        </div>
        <button
          data-testid="search-artist-button"
          className="btn blue-btn"
          type="button"
          onClick={ searchArtist }
          disabled={ isClickable }
        >
          Search
        </button>
      </div>
    );

    const noAlbumFound = <p className="no-album">Nenhum álbum foi encontrado</p>;

    const showingResults = (
      <div className="search-results">
        <p className="search-results-title">
          Resultado de álbuns de:
          { ` ${shownName}` }
        </p>
        <div className="search-results-albums">
          {albums.length === 0 ? noAlbumFound : mapAlbums(albums)}
        </div>
      </div>
    );

    return (
      <div data-testid="page-search" className="page-search">
        <Header />
        <div className="search-content">
          {loading ? <LoadingComp /> : searchContainer}
          {hasResults && showingResults}
        </div>
      </div>
    );
  }
}

export default Search;
