/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { Header, Loader, AlbumCard } from '../components';
import { SearchField } from '../components/styled';
import '../css-files/search.css';

const TWO = 2;

function Search() {
  const [artistName, setArtistName] = useState('');
  const [resultsFor, setResultsFor] = useState('');
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [haveResults, setHaveResults] = useState(false);

  useEffect(() => {
    if (artistName !== '') {
      setLoading(true);
      searchAlbumsAPI(resultsFor).then((r) => {
        setAlbums(r);
        setLoading(false);
        setHaveResults(true);
        setArtistName('');
      });
    }
  }, [resultsFor]);

  const searchArtist = (e) => {
    if (!e.key || e.key === 'Enter') setResultsFor(artistName);
  };

  const renderSearchContainer = () => (
    <div className="search-container">
      <SearchField>
        <InputGroup className="d-flex my-4 justify-content-center">
          <Form.Control
            data-testid="search-artist-input"
            type="text"
            placeholder="Artist Name"
            value={ artistName }
            onChange={ ({ target: { value } }) => setArtistName(value) }
            onKeyPress={ searchArtist }
          />
          <Button
            data-testid="search-artist-button"
            variant="info"
            onClick={ searchArtist }
            disabled={ artistName.length < TWO }
          >
            <i className="fas fa-search" />
          </Button>
        </InputGroup>
      </SearchField>
    </div>
  );

  const renderResults = () => {
    if (haveResults) {
      return (
        <div className="search-results">
          <p className="text-center m-0">
            Showing results for:
            {` ${resultsFor}`}
          </p>
          <div className="search-results-albums">
            {
              albums.length === 0 ? (
                <p className="no-album">No album was found</p>
              ) : (
                albums.map((album) => (
                  <AlbumCard key={ album.collectionId } album={ album } />
                ))
              )
            }
          </div>
        </div>
      );
    }
  };

  return (
    <div data-testid="page-search" className="page-search">
      <Header />
      {renderSearchContainer()}
      {loading ? <div className="loader-container"><Loader /></div> : renderResults()}
    </div>
  );
}

export default Search;
