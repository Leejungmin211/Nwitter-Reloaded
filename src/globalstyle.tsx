import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
${reset};

* {
  box-sizing: border-box;
}

:root {
  --color-white: #FFFFFF;
  --color-linegray: #E8E8E8;
  --color-lightgray: #ccc;
  --color-gray5: #555;
  --color-gray6: #666;
  --color-gray8: #888;
  --color-darkgray: #353535;
  --color-black: #2b2b2b;
}

body {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background-color: var(--color-white);
  color: var(--color-black);
  font-family: 'system-ui', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

textarea {
  font-family: 'system-ui', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
}

button {
  font-size: 15px;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
}

a {text-decoration: none; outline: none; color: inherit; cursor: pointer;}
a:hover, a:active {text-decoration: none; color: inherit;}
`;
