import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ResultCard } from './styled';

function AlbumCard({ album }) {
  const { collectionId, artistName, artworkUrl100, collectionName } = album;
  const largerImage = artworkUrl100.split('100x100').join('400x400');

  return (
    <ResultCard>
      <Link
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        <img src={ largerImage } alt={ collectionName } />
      </Link>
      <div className="result-album-info">
        <p className="result-album-title">{ collectionName }</p>
        <p>{ artistName }</p>
      </div>
    </ResultCard>
  );
}

AlbumCard.propTypes = {
  album: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AlbumCard;
