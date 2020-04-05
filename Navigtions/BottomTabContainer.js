import { connect } from "react-redux";
import BottomTab from "./BottomTab";
//states from modules home.js
const mapStateToProps = (state) => ({
	userData: state.authLoad.userData,
});

const mapActionCreators = {
	
};
export default connect(mapStateToProps, mapActionCreators)(BottomTab);