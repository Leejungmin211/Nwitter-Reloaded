import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createGlobalStyle, styled } from "styled-components";
import reset from "styled-reset";
import Layout from "./components/layout";
import LoadingScreen from "./components/loading-screen";
import ProtectedRoute from "./components/protected-route";
import { auth } from "./firebase";
import CreateAccount from "./routes/create-account";
import Home from "./routes/home";
import Login from "./routes/login";
import Profile from "./routes/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/create-account", element: <CreateAccount /> },
]);

const GlobalStyles = createGlobalStyle`
${reset};
* {
box-sizing: border-box;
}
body {
background-color: black;
color: white;
font-family: 'system-ui', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`;

const Wrapper = styled.main`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
