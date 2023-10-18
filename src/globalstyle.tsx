import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
${reset};

* {
  box-sizing: border-box;
}

body {
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;
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
}
`;
