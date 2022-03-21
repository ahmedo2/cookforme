import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { AiOutlineUser } from "react-icons/ai";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";
import { loginUser } from "../../redux/user/userActions";
import useStyles from "./styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/ahmedo2/cookforme">
        Cook For Me
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn({ history }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const { loading, user } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (user) {
      history.push("/home");
    }
  }, [history, user]);

  const classes = useStyles();

  return (
    <div>
      {loading && <LinearProgress />}
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          component={Paper}
          elevation={6}
          square
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AiOutlineUser fontSize={30} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Anmelden
            </Typography>
            <form className={classes.form} onSubmit={onSubmit}>
              <TextField
                variant="outlined"
                type="email"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={handleChange}
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Sie haben kein Konto? Anmeldung..."}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
