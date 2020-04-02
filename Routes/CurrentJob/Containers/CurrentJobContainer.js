import { connect } from "react-redux";
import CurrentJob from "../Components/CurrentJob";
import {
	updateBidTripStatus,
	getDriverLocation
} from "../Modules/CurrentJob";
//states from modules home.js
const mapStateToProps = (state) => ({
	region: state.currentJob.region,
	liveJob: state.currentJob.liveJob
});

const mapActionCreators = {
	updateBidTripStatus,
	getDriverLocation
};
export default connect(mapStateToProps, mapActionCreators)(CurrentJob);