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
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { AiOutlineUser } from "react-icons/ai";
import Avatar from "@material-ui/core/Avatar";
import { registerUser } from "../../redux/user/userActions";
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

export default function SignUp({ history }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const { loading } = useSelector((state) => state.userRegister);
  const { user } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  const { name, email, password, confirmPassword, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    // console.log(formData);
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Passwörter stimmen nicht überein");
    }

    dispatch(registerUser({ name, email, password, isChef: role === "chef" }));
  };

  useEffect(() => {
    if (user) {
      history.push("/home");
    }
  }, [user, history]);

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
              Erstelle deinen Account
            </Typography>
            <form className={classes.form} onSubmit={onSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <FormControl
                required
                className={classes.radio}
                component="fieldset"
              >
                <FormLabel component="legend">Role</FormLabel>
                <RadioGroup
                  aria-label="role"
                  name="role"
                  value={role}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel
                    value="user"
                    control={<Radio color="primary" />}
                    label="User"
                  />
                  <FormControlLabel
                    value="chef"
                    control={<Radio color="primary" />}
                    label="Chef"
                  />
                </RadioGroup>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Anmeldung
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signin" variant="body2">
                    {"Sie haben bereits ein Konto? Anmelden..."}
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
