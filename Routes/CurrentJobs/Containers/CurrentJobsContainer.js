import { connect } from "react-redux";
import CurrentJobs from "../Components/CurrentJobs";
import {
	getCurrentJobs
} from "../Modules/CurrentJobs";
//states from modules home.js
const mapStateToProps = (state) => ({
	userData: state.authLoad.userData,
	currentJobs: state.currentJobs.currentJobs
});

const mapActionCreators = {
	getCurrentJobs
};
export default connect(mapStateToProps, mapActionCreators)(CurrentJobs);