/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Header, MusicCard } from '../components';
import { AlbumContainer } from '../components/styled';
import getMusics from '../services/musicsAPI';

function Album() {
  const { id } = useParams();
  const [songs, setSongs] = useState([]);
  const [album, setAlbum] = useState({});

  useEffect(() => getMusics(id).then((r) => { setSongs(r); setAlbum(r[0]); }), [id]);

  const { artistName = '', collectionName = '', artworkUrl100 = '' } = album;
  const albumCover = artworkUrl100.split('100x100').join('1000x1000');

  return (
    <div data-testid="page-album">
      <Header />
      <AlbumContainer>
        <div className="album-info">
          <img src={ albumCover } alt={ `Album cover: ${collectionName}` } />
          <p data-testid="album-name" className="album-name">{ collectionName }</p>
          <p data-testid="artist-name" className="album-artist-name">
            { artistName }
          </p>
        </div>
        <div className="songs">
          {
            songs.sort((a, b) => a.trackNumber - b.trackNumber)
              .map((song, i) => ((i !== 0) ? (
                <MusicCard key={ song.trackId } song={ song } />
              ) : null))
          }
          <hr />
        </div>
      </AlbumContainer>
    </div>
  );
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
