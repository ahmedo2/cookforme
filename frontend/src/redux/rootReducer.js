import { combineReducers } from "redux";
import { userRegisterReducer, userLoginReducer } from "./user/userReducers";

export default combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
});
