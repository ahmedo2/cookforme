import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  heroSection: {
    background: "#F6FBF8",
    minHeight: "100vh",
    overflowX: "hidden",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  heroContent: {
    padding: "4rem",
    [theme.breakpoints.down("xs")]: {
      padding: "2.5rem",
    },
  },
  heroHeading: {
    fontSize: "4rem",
    fontWeight: 600,
    marginBottom: "1.5rem",
    color: "#393e46",
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.5rem",
    },
  },
  heroDescription: {
    fontSize: "1.1rem",
    color: "#898b8a",
    marginBottom: "2rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  heroButton: {
    background: "linear-gradient(to right, #11998e, #38ef7d)",
    fontSize: "1.25rem",
    color: "#fff",
    padding: "0.65rem 1.5rem",
    borderRadius: 50,
  },
  heroImage: {
    height: "125%",
    width: "125%",
    paddingRight: "1.5rem",
  },
}));

export default useStyles;
