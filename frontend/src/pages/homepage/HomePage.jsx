import React, { useState } from "react";
import useStyles from "./styles";
import Typography from "@material-ui/core/Typography";
// import FoodCard from '../../components/foodcard/Foodcard.component';

const HomePage = () => {
  const classes = useStyles();

  const [search, setSearch] = useState("");

  return (
    <>
      <div className={classes.heroSection}>
        <Typography className={classes.heroHeader}>
          Holen Sie sich gesundes Essen bei Ihnen
          <span className={classes.highlightColor}>
            {" "}
            Schritte in 30 Minuten{" "}
          </span>
          wie hausgemachtes Essen
        </Typography>
        <div className={classes.searchform}>
          <input
            type="text"
            className={classes.searchbox}
            placeholder="Enter your location"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={classes.searchButton}>Suche</button>
        </div>
        <p className={classes.advancedSearch}>Erweiterte Suche</p>
      </div>
    </>
  );
};

export default HomePage;
