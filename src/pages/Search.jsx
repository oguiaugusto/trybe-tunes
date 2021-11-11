import React, { Component } from 'react';
import Header from '../components/Header';
import '../css-files/search.css';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { handleChange } = this;
    const { artistName } = this.state;

    const minLength = 2;
    const isClickable = artistName.length < minLength;

    return (
      <div data-testid="page-search">
        <Header />
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
            />
            <i className="fas fa-search" />
          </div>
          <button
            data-testid="search-artist-button"
            className="btn blue-btn"
            type="button"
            disabled={ isClickable }
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
