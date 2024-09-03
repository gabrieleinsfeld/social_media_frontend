// reducers/dataReducer.js
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  TOGGLE_LIKE,
} from "../actions/actionsTypes";

const initialState = {
  loading: false,
  posts: [],
  error: "",
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: "",
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        posts: [],
        error: action.error,
      };
    case TOGGLE_LIKE:
      return {
        ...state,
        posts: {
          ...state.posts,
          posts: state.posts.posts.map((post) =>
            post.id === action.payload ? { ...post, liked: !post.liked } : post
          ),
        },
      };
    default:
      return state;
  }
};

export default postReducer;
