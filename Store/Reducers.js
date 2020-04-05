import { combineReducers } from "redux";
import { AuthLoadScreenReducer as authLoad } from '../Routes/AuthLoadScreen/Modules/AuthLoadScreen'
import { LoginReducer as login } from '../Routes/Login/Modules/Login'
import { RegisterReducer as register } from '../Routes/Register/Modules/Register'
import { RegProcessReducer as regprocess } from '../Routes/RegProcess/Modules/RegProcess'
import { HomeReducer as home } from '../Routes/Home/Modules/Home'
import { AddJobReducer as addJob } from '../Routes/AddJob/Modules/AddJob'
import { JobBidsReducer as jobBids } from '../Routes/JobBids/Modules/JobBids'
import { CurrentJobReducer as currentJob } from '../Routes/CurrentJob/Modules/CurrentJob'
import { CurrentJobsReducer as currentJobs } from '../Routes/CurrentJobs/Modules/CurrentJobs'

export const makeRootReducer = () => {
	return combineReducers({
		authLoad,
		login,
		register,
		regprocess,
		home,
		addJob,
		jobBids,
		currentJob,
		currentJobs
	});
}

export default makeRootReducer;