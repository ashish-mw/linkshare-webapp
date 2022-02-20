import { Suspense, lazy, useReducer, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// services
import {
  getAccessTokenStorage,
  getThemeStorage,
  // putAccessTokenStorage,
  putThemeStorage,
} from "./services/storage";

// context
import StateContext from "./contexts/StateContext";
import DispatchContext from "./contexts/DispatchContext";

// components
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";

// pages
import NotFoundPage from "./pages/NotFoundPage";
const HomePage = lazy(() => import("./pages/HomePage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const MyLinksPage = lazy(() => import("./pages/MyLinksPage"));

function App() {
  const appState = {
    accessToken: getAccessTokenStorage(),
    isLoggedIn: Boolean(getAccessTokenStorage()),
    user: null,
    theme: getThemeStorage(),
  };

  function appReducer(state, action) {
    switch (action.type) {
      case "login":
        return {
          ...state,
          isLoggedIn: true,
          accessToken: action.value,
        };
      case "setUser":
        return {
          ...state,
          user: action.value,
        };
      case "logout":
        return {
          ...state,
          isLoggedIn: false,
          accessToken: null,
          user: null,
        };
      case "setTheme":
        return {
          ...state,
          theme: action.value,
        };
      default:
        return {
          ...state,
        };
    }
  }

  const [state, dispatch] = useReducer(appReducer, appState);

  useEffect(() => {
    if (state.theme) {
      putThemeStorage(state.theme);
    }
  }, [state.theme]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/my-links"
                element={<PrivateRoute outlet={<MyLinksPage />} />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
