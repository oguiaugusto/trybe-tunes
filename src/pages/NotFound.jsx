import React from 'react';
import styled from 'styled-components';

const NotFoundStyled = styled.div`
  color: #eee;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5rem 0;
`;

function NotFound() {
  return (<NotFoundStyled data-testid="page-not-found">Page not found</NotFoundStyled>);
}

export default NotFound;
