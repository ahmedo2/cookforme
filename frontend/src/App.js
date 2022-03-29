import { ThemeProvider, Button } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import Notifier from "./components/notifier/Notifier";
import Navbar from "./components/navbar/Navbar";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import HomePage from "./pages/homepage/HomePage";
import LandingPage from "./pages/landingpage/LandingPage";
import VerifyEmail from "./pages/verifiyemail/VerifyEmail";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import ResetPassword from "./pages/resetpassword/ResetPassword";
import AddFood from "./pages/addfood/AddFood";
import SearchPage from "./pages/search/Search";
import OnBoarding from "./pages/onboarding/OnBoarding";
import theme from "./theme";
import store from "./redux/store";
import { closeSnackbar } from "./redux/alert/alertActions";

const snackbarDimissButton = () => (
  <Button onClick={() => store.dispatch(closeSnackbar())}>dismiss me</Button>
);

const snackbarPosition = () => ({ vertical: "bottom", horizontal: "right" });

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SnackbarProvider
          maxSnack={1}
          action={snackbarDimissButton}
          anchorOrigin={snackbarPosition()}
        >
          <Notifier />
          <BrowserRouter>
            <Navbar />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/home" component={HomePage} />
              <Route exact path="/onboarding" component={OnBoarding} />
              <Route
                path="/verify/:verificationToken"
                component={VerifyEmail}
              />
              <Route path="/forgot" component={ForgotPassword} />
              <Route
                path="/reset-password/:resetToken"
                component={ResetPassword}
              />
              <Route path="/addfood" component={AddFood} />
              <Route path="/search" component={SearchPage} />
            </Switch>
          </BrowserRouter>
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
