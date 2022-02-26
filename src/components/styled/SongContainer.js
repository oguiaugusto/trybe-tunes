import styled from 'styled-components';

const SongContainer = styled.div`
  .song-info {
    display: grid;
    grid-template-columns: 10% 1fr 10%;
    justify-items: center;
    margin-bottom: 10px;
  }

  .song-info p {
    margin: 0;
  }

  .song-info .song-title {
    justify-self: start;
  }

  audio {
    width: 100%;
    height: 30px;
    box-shadow: 0px 5px 8px 0px rgba(89, 87, 107, 0.2);
  }

  audio::-webkit-media-controls-panel {
    background-color: #52606d;
    height: 30px !important;
  }

  audio::-webkit-media-controls-play-button,
  audio::-webkit-media-controls-mute-button,
  audio::-webkit-media-controls-timeline-container,
  audio::-webkit-media-controls-current-time-display,
  audio::-webkit-media-controls-time-remaining-display,
  audio::-webkit-media-controls-timeline,
  audio::-webkit-media-controls-volume-slider-container,
  audio::-webkit-media-controls-volume-slider,
  audio::-webkit-media-controls-seek-back-button,
  audio::-webkit-media-controls-seek-forward-button,
  audio::-webkit-media-controls-fullscreen-button,
  audio::-webkit-media-controls-rewind-button,
  audio::-webkit-media-controls-return-to-realtime-button,
  audio::-webkit-media-controls-toggle-closed-captions-button {
    filter: brightness(0) invert(1);
  }
`;

export default SongContainer;
