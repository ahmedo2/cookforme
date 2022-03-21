import { ThemeProvider } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import HomePage from "./pages/homepage/HomePage";
import LandingPage from "./components/landingpage/LandingPage";
import theme from "./theme";
import store from "./redux/store";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/home" component={HomePage} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
