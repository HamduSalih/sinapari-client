import { combineReducers } from "redux";
import { AuthLoadScreenReducer as authLoad } from '../Routes/AuthLoadScreen/Modules/AuthLoadScreen'
import { LoginReducer as login } from '../Routes/Login/Modules/Login'


export const makeRootReducer = () => {
	return combineReducers({
		authLoad,
		login
	});
}

export default makeRootReducer;