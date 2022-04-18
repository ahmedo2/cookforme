import { combineReducers } from "redux";
import {
  userRegisterReducer,
  userLoginReducer,
  userVerifyReducer,
  userOnboardingReducer,
  userUpdateReducer,
} from "./user/userReducers";
import alertReducer from "./alert/alertReducers";
import {
  foodAddReducer,
  foodSearchReducer,
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
  myfood: getMyFoodReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderListMy: orderListMyReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDispatch: orderDispatchReducer,
});
