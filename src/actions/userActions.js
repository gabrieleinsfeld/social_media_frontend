import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from "./actionsTypes";

import { URL } from "../../url";

export const fetchData = (username, password) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });

    try {
      const response = await fetch(`${URL}/log-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.message && data.message == "Invalid Credentials") {
        dispatch({ type: FETCH_DATA_ERROR, error: "Invalid Credentials" });
      } else {
        const { user, token } = data;
        localStorage.setItem("authToken", token);
        dispatch({ type: FETCH_DATA_SUCCESS, payload: { user, token } });
      }
    } catch (error) {
      dispatch({ type: FETCH_DATA_FAILURE, error: error.message });
    }
  };
};
