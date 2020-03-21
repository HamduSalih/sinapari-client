import { connect } from "react-redux";
import RegProcess from '../Components/RegProcess'
import {
	getUserData
} from "../Modules/RegProcess";
//states from modules home.js
const mapStateToProps = (state) => ({
	userData: state.regprocess.userData || {}
});

const mapActionCreators = {
	getUserData
};
export default connect(mapStateToProps, mapActionCreators)(RegProcess);