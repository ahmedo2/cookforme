import React from "react";
import { Card, Grid, Typography, Box } from "@material-ui/core";
import TodaysOrder from "../../assets/today-orders.svg";
import UntrackedOrder from "../../assets/untracted-order.svg";
import AllCheckOrder from "../../assets/all-check-order.svg";
import Orders from "../../assets/all-order.svg";
import useStyles from "./styles";

const ChefLanding = ({ orders }) => {
  const classes = useStyles();
  const d = new Date()
    .toISOString()
    .replace(/T.*/, "")
    .split("-")
    .reverse()
    .join("-");
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <Card className={classes.card}>
            <img alt="" src={TodaysOrder} />
            <Typography className={classes.heading}>
              heutige Bestellungen
            </Typography>
            <Typography className={classes.number} variant="h4">
              {orders &&
                orders.filter(
                  (order) =>
                    order.createdAt
                      .replace(/T.*/, "")
                      .split("-")
                      .reverse()
                      .join("-") === d
                ).length}
            </Typography>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Card className={classes.card}>
            <img alt="" src={UntrackedOrder} />
            <Typography className={classes.heading}>
              Aufträge zu bestätigen
            </Typography>
            <Typography className={classes.number} variant="h4">
              25
            </Typography>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Card className={classes.card}>
            <img alt="" src={AllCheckOrder} />
            <Typography className={classes.heading}>
              Untracted Orders
            </Typography>
            <Typography className={classes.number} variant="h4">
              {orders && orders.filter((order) => order.isConfirmed).length}
            </Typography>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Card className={classes.card}>
            <img alt="" src={Orders} />
            <Typography className={classes.heading}>Total orders</Typography>
            <Typography className={classes.number} variant="h4">
              {orders?.length}
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ChefLanding;
