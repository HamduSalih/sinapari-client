import { combineReducers } from "redux";
import { AuthLoadScreenReducer as authLoad } from '../Routes/AuthLoadScreen/Modules/AuthLoadScreen'
import { HomeReducer as home } from '../Routes/Home/Modules/Home'


export const makeRootReducer = () => {
	return combineReducers({
		authLoad,
		home
	});
}

export default makeRootReducer;