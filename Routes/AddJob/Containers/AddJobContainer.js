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
    selectedLoadPoint: state.addJob.selectedLoadPoint || {},
    selectedDropPoint: state.selectedDropPoint || {}
});

const mapActionCreators = {
    getInputType,
    getSelectedAddress
};
export default connect(mapStateToProps, mapActionCreators)(AddJob);