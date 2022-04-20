import { Link } from "react-router-dom";
import { Grid, Typography, Button } from "@material-ui/core";
import landingImg from "../../assets/landing.jpg";
import useStyles from "./styles";

const LandingPage = () => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        className={classes.heroSection}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={6} className={classes.heroContent}>
          <Typography variant="h1" className={classes.heroHeading}>
            Hergestellt von lokalen und talentierten Köchen
          </Typography>
          <Typography className={classes.heroDescription}>
            Hausgemachte Köstlichkeiten zum Greifen nah!
          </Typography>
          <Link to="/home">
            <Button variant="contained" className={classes.heroButton}>
              Jetzt bestellen
            </Button>
          </Link>
        </Grid>
        <Grid item md={6}>
          <img
            src={landingImg}
            className={classes.heroImage}
            alt="Landing Food Platter"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LandingPage;
