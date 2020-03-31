import { connect } from "react-redux";
import AuthLoadScreen from "../Components/AuthLoadScreen";
import {
	getUserData,
	getAllJobs
} from "../Modules/AuthLoadScreen";
//states from modules home.js
const mapStateToProps = (state) => ({
	userData: state.authLoad.userData || {}
});

const mapActionCreators = {
	getUserData,
	getAllJobs
};
export default connect(mapStateToProps, mapActionCreators)(AuthLoadScreen);