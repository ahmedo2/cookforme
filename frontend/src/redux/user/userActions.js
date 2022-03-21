import axios from "axios";
import { enqueueSnackbar } from "../alert/alertActions";

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
} from "./userTypes";

export const registerUser = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: REGISTER_REQUEST });
    const { data } = await axios.post("/api/users/register", formData, config);
    dispatch({ type: REGISTER_SUCCESS, payload: data });
    dispatch(
      enqueueSnackbar({
        message: "Bitte überprüfen Sie Ihren Posteingang zur Bestätigung",
        options: { variant: "info" },
      })
    );

    history.push("/home");
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: REGISTER_FAIL,
      payload: errorMsg,
    });
    dispatch(
      enqueueSnackbar({
        message: errorMsg,
        options: { variant: "error" },
      })
    );
  }
};

export const loginUser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post("/api/users/login", formData, config);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: LOGIN_FAIL,
      payload: errorMsg,
    });
    dispatch(
      enqueueSnackbar({
        message: errorMsg,
        options: { variant: "error" },
      })
    );
  }
};

export const verifyAccount = (verificationToken) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_REQUEST });

    await axios.put(`/api/users/verify/${verificationToken}`);

    dispatch({ type: VERIFY_SUCCESS });

    dispatch(
      enqueueSnackbar({
        message: "Deine Email wurde verifiziert. Bitte loggen Sie sich ein.",
        options: { variant: "success" },
      })
    );
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: VERIFY_FAIL,
      payload: errorMsg,
    });

    dispatch(
      enqueueSnackbar({
        message: errorMsg,
        options: { variant: "error" },
      })
    );
  }
};
