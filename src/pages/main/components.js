import styled from 'styled-components';

export const Container = styled.section`
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 20px;

  @media (max-width: 830px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;
