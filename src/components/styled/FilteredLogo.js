import styled from 'styled-components';

const FilteredLogo = styled.div`
  .white {
    position: absolute;
    filter: brightness(0) invert(1);
    -webkit-clip-path: polygon(0 42%, 73% 47%, 73% 73%, 100% 73%, 100% 100%, 0 100%);
    clip-path: polygon(0 42%, 73% 47%, 73% 73%, 100% 73%, 100% 100%, 0 100%);
  }
`;

export default FilteredLogo;
