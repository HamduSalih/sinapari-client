import { connect } from "react-redux";
import AddJob from "../Components/AddJob";
import {
	
} from "../Modules/AddJob";
//states from modules home.js
const mapStateToProps = (state) => ({
	
});

const mapActionCreators = {
	
};
export default connect(mapStateToProps, mapActionCreators)(AddJob);