import styled from 'styled-components';

const HeaderLinks = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;

  a {
    background-color: #e4e7eb;
    color: #023031;
    display: block;
    font-size: large;
    font-weight: 600;
    padding: 5px 0;
    text-decoration: none;
    transition-duration: 200ms;
  }

  a:hover {
    background-color: #616e76;
    color: #eee;
  }
`;

export default HeaderLinks;
