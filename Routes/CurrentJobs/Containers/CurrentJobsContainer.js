import { connect } from "react-redux";
import CurrentJobs from "../Components/CurrentJobs";
import {
	updateBidTripStatus,
	getDriverLocation
} from "../Modules/CurrentJobs";
//states from modules home.js
const mapStateToProps = (state) => ({
});

const mapActionCreators = {
	updateBidTripStatus,
	getDriverLocation
};
export default connect(mapStateToProps, mapActionCreators)(CurrentJobs);