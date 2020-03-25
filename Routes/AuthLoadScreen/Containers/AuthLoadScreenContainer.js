import { connect } from "react-redux";
import AuthLoadScreen from "../Components/AuthLoadScreen";
import {
	getUserData
} from "../Modules/AuthLoadScreen";
//states from modules home.js
const mapStateToProps = (state) => ({
	userData: state.authLoad.userData || {}
});

const mapActionCreators = {
	getUserData
};
export default connect(mapStateToProps, mapActionCreators)(AuthLoadScreen);