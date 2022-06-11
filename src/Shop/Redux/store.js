import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import ReduxThunk from "redux-thunk";
import { ShopReducer } from "./ShopData/reducer";
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    shop: ShopReducer,
  
})

export const store = createStore(rootReducer,applyMiddleware(ReduxThunk));
