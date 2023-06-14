import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  body {
    font-family: 'Inter', sans-serif;
    touch-action: none;
    margin: 0;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  #root {
    overflow-y: hidden;
    overflow-x: hidden;
  }

  ul,
  li {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  img {
    pointer-events: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  input {
    border: none;
    background: none;
    outline: none;
    padding: 0;
  }
`;
