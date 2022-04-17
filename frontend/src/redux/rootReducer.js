import { combineReducers } from "redux";
import {
  userRegisterReducer,
  userLoginReducer,
  userVerifyReducer,
  userOnboardingReducer,
} from "./user/userReducers";
import alertReducer from "./alert/alertReducers";
import { foodAddReducer, foodSearchReducer } from "./food/foodReducers";
import { cartReducer } from "./cart/cartReducers";
import { orderCreateReducer, orderListMyReducer } from "./order/orderReducers";

export default combineReducers({
  alert: alertReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userVerify: userVerifyReducer,
  userOnboarding: userOnboardingReducer,
  foodAdd: foodAddReducer,
  foodSearch: foodSearchReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderListMy: orderListMyReducer,
});
