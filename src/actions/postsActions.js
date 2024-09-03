import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from "./actionsTypes";

import { URL } from "../../url";

export const toggleLike = (postId) => ({
  type: "TOGGLE_LIKE",
  payload: postId,
});

export const fetchPosts = (token) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });

    try {
      const response = await fetch(`${URL}/post/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const posts = await response.json();
      if (posts.message && posts.message == "Invalid Credentials") {
        dispatch({ type: FETCH_DATA_ERROR, error: "Invalid Credentials" });
      } else {
        dispatch({ type: FETCH_DATA_SUCCESS, payload: posts });
      }
    } catch (error) {
      dispatch({ type: FETCH_DATA_FAILURE, error: error.message });
    }
  };
};
