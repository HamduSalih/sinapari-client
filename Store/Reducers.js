import { combineReducers } from "redux";
import { AuthLoadScreenReducer as authLoad } from '../Routes/AuthLoadScreen/Modules/AuthLoadScreen'


export const makeRootReducer = () => {
	return combineReducers({
		authLoad,
	});
}

export default makeRootReducer;