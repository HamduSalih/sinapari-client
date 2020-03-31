import { connect } from "react-redux";
import Home from "../Components/Home";
import {
	
} from "../Modules/Home";
//states from modules home.js
const mapStateToProps = (state) => ({
	userData: state.regprocess.userData || {},
	allJobs: state.authLoad.allJobs
});

const mapActionCreators = {
	
};
export default connect(mapStateToProps, mapActionCreators)(Home);