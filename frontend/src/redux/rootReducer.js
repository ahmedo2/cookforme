import { combineReducers } from "redux";
import {
  userRegisterReducer,
  userLoginReducer,
  userVerifyReducer,
} from "./user/userReducers";
import alertReducer from "./alert/alertReducers";

export default combineReducers({
  alert: alertReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userVerify: userVerifyReducer,
});
