import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import DashboardCard from "../../components/dashboardcard/DashboardCard";
import UserLanding from "../../components/userlanding/UserLanding";
import ChefLanding from "../../components/cheflanding/ChefLanding";
import useStyles from "./styles";
import { getMyOrders } from "../../redux/order/orderActions";

const UserDashboard = ({ history }) => {
  const classes = useStyles();

  const { user } = useSelector((state) => state.userLogin);
  const { orders, loading } = useSelector((state) => state.orderListMy);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      history.push("/signin");
    } else {
      dispatch(getMyOrders(user?.isChef ? "chef" : "user"));
    }
  }, [history, user, dispatch]);
  return (
    <div className={classes.root}>
      {user?.isChef ? <ChefLanding /> : <UserLanding />}
      <Grid container>
        <Grid md={3} item className={classes.profileGrid}>
          <Typography className={classes.profileHeader} variant="h4">
            PROFILE
          </Typography>
          <div className={classes.profileLinkDiv}>
            <Link to="/edit-profile">
              <Typography className={classes.profileLink}>
                Edit Profile
              </Typography>
            </Link>
            <Link to="/edit-password">
              >
              <Typography className={classes.profileLink}>
                Update Password
              </Typography>
            </Link>
            {user?.isChef && (
              <Link to="/my-food">
                <Typography className={classes.profileLink}>
                  My food items
                </Typography>
              </Link>
            )}
          </div>
          <Typography className={classes.profileHeader} variant="h4">
            ORDER HISTORY
          </Typography>
          <div className={classes.profileLinkDiv}>
            <Typography className={classes.profileLink}>All Orders</Typography>
          </div>
        </Grid>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <Grid md={9} item className={classes.cardsDiv}>
            <Grid container spacing={3}>
              {orders.length === 0 ? (
                <Typography color="primary" variant="h6">
                  You have not placed any orders yet
                </Typography>
              ) : (
                orders.map((order) => (
                  <Grid key={order._id} item md={6}>
                    <DashboardCard order={order} />
                  </Grid>
                ))
              )}
            </Grid>
            <Grid item md={6}>
              <DashboardCard />
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default UserDashboard;
