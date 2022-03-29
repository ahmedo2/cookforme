import { combineReducers } from "redux";
import {
  userRegisterReducer,
  userLoginReducer,
  userVerifyReducer,
  userOnboardingReducer,
} from "./user/userReducers";
import alertReducer from "./alert/alertReducers";
import { foodAddReducer, foodSearchReducer } from "./food/foodReducers";

export default combineReducers({
  alert: alertReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userVerify: userVerifyReducer,
  userOnboarding: userOnboardingReducer,
  foodAdd: foodAddReducer,
  foodSearch: foodSearchReducer,
});
