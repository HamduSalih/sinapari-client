import { combineReducers } from "redux";
import { AuthLoadScreenReducer as authLoad } from '../Routes/AuthLoadScreen/Modules/AuthLoadScreen'
import { LoginReducer as login } from '../Routes/Login/Modules/Login'
import { RegisterReducer as register } from '../Routes/Register/Modules/Register'


export const makeRootReducer = () => {
	return combineReducers({
		authLoad,
		login,
		register
	});
}

export default makeRootReducer;