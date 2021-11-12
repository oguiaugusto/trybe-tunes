import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumResult extends Component {
  render() {
    const { id, artistName, imageSourceSmall, albumName } = this.props;

    const splitImage = imageSourceSmall.split('100x100');
    const imageSource = splitImage.join('2000x2000');

    return (
      <div className="result-album">
        <Link
          data-testid={ `link-to-album-${id}` }
          to={ `/album/${id}` }
        >
          <img src={ imageSource } alt={ albumName } />
        </Link>
        <div className="result-album-info">
          <p className="result-album-title">{ albumName }</p>
          <p>{ artistName }</p>
        </div>
      </div>
    );
  }
}

AlbumResult.propTypes = {
  id: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  imageSourceSmall: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
};

export default AlbumResult;
