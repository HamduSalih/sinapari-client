import { combineReducers } from "redux";
import { HomeReducer as home } from "../Routes/Home/Modules/Home";
import { AuthLoadScreenReducer as authLoad } from '../Routes/AuthLoadScreen/Modules/AuthLoadScreen'


export const makeRootReducer = () => {
	return combineReducers({
		authLoad,
	});
}

export default makeRootReducer;