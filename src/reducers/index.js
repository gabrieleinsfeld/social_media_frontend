import { combineReducers } from "redux";
import exampleReducer from "./exampleReducer";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
const rootReducer = combineReducers({
  example: exampleReducer,
  user: userReducer,
  posts: postReducer,
});

export default rootReducer;
