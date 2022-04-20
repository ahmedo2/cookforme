import { combineReducers } from "redux";

import alertReducer from "./alert/alertReducers";

import {
  userRegisterReducer,
  userLoginReducer,
  userVerifyReducer,
  userOnboardingReducer,
  userUpdateReducer,
  chefListReducer,
  chefVerifyReducer,
} from "./user/userReducers";

import {
  foodAddReducer,
  foodSearchReducer,
  foodEditReducer,
  getMyFoodReducer,
} from "./food/foodReducers";
import { cartReducer } from "./cart/cartReducers";
import {
  orderCreateReducer,
  orderListMyReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDispatchReducer,
} from "./order/orderReducers";
export default combineReducers({
  alert: alertReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userVerify: userVerifyReducer,
  userOnboarding: userOnboardingReducer,
  userUpdate: userUpdateReducer,
  foodAdd: foodAddReducer,
  foodSearch: foodSearchReducer,
  foodEdit: foodEditReducer,
  myfood: getMyFoodReducer,
  chefList: chefListReducer,
  chefVerify: chefVerifyReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderListMy: orderListMyReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDispatch: orderDispatchReducer,
});
