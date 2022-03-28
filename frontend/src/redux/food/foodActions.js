import axios from "axios";
import { enqueueSnackbar } from "../alert/alertActions";

import { ADD_FOOD_REQUEST, ADD_FOOD_SUCCESS, ADD_FOOD_FAIL } from "./foodTypes";

export const addFoodItem = (formData) => async (dispatch, getState) => {
  const { userLogin } = getState();
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${userLogin.token}`,
    },
  };

  try {
    dispatch({ type: ADD_FOOD_REQUEST });
    const { data } = await axios.post("/api/foods", formData, config);
    dispatch({ type: ADD_FOOD_SUCCESS, payload: data.food });
    dispatch(
      enqueueSnackbar({
        message: "Gericht erfolgreich zu Ihrem Menü hinzugefügt",
        options: { variant: "success" },
      })
    );
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: ADD_FOOD_FAIL, payload: errorMsg });

    dispatch(
      enqueueSnackbar({
        message: errorMsg,
        options: {
          variant: "error",
        },
      })
    );
  }
};
