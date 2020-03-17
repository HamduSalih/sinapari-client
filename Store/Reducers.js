import { combineReducers } from "redux";
import { HomeReducer as home } from "../Routes/Home/Modules/Home";


export const makeRootReducer = () => {
	return combineReducers({
		login,
	});
}

export default makeRootReducer;