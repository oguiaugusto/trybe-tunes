import styled from 'styled-components';

const IconBtn = styled.div`
  background: none;

  svg {
    transition-duration: 100ms;
  }

  svg:hover {
    transform: scale(1.15);
  }

  svg:active {
    transform: scale(0.95);
  }
`;

export default IconBtn;
