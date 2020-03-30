import { connect } from "react-redux";
import AddJob from "../Components/AddJob";
import {
    getInputType,
    getSelectedAddress
} from "../Modules/AddJob";
//states from modules home.js
const mapStateToProps = (state) => ({
    resultTypes: state.addJob.resultTypes || {},
    selectedLoadAddress: state.addJob.selectedLoadAddress || {},
    selectedDropAddress: state.addJob.selectedDropAddress || {},
    distanceMatrix: state.addJob.distanceMatrix || {},
    userData: state.regprocess.userData,
    selectedLoadPoint: state.addJob.selectedLoadPoint || {},
    selectedDropPoint: state.addJob.selectedDropPoint || {}
});

const mapActionCreators = {
    getInputType,
    getSelectedAddress
};
export default connect(mapStateToProps, mapActionCreators)(AddJob);