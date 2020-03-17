import { connect } from "react-redux";
import AuthLoadScreen from "../Components/AuthLoadScreen";
import {
	
} from "../Modules/AuthLoadScreen";
//states from modules home.js
const mapStateToProps = (state) => ({
	
});

const mapActionCreators = {
	
};
export default connect(mapStateToProps, mapActionCreators)(AuthLoadScreen);