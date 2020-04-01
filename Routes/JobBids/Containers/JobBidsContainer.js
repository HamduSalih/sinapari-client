import { connect } from "react-redux";
import JobBids from "../Components/JobBids";
import {
	getJobBids
} from "../Modules/JobBids";
//states from modules home.js
const mapStateToProps = (state) => ({
	jobBids: state.jobBids.jobBids
});

const mapActionCreators = {
	getJobBids
};
export default connect(mapStateToProps, mapActionCreators)(JobBids);