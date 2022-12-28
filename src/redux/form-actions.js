import { formActions } from "./form-slice";
import {sendReport, uploadImage} from '../../firebase'

export const sendReportAction = (report) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await sendReport(report)
      if (res){
        dispatch(formActions.setData({complete: true, failed: true}));
      }
      else {
        dispatch(formActions.setData({complete: false, failed: true}));
      }
      return res
    };
    try {
      return await sendRequest();
    } catch (err) {
        alert("Something went wrong, please try again later")
        return false
    }
  };
};

export const reset = () => {
  return async (dispatch) => {
    dispatch(formActions.resetData());
  };
}

export const startForm = () => {
  return async (dispatch) => {
    dispatch(formActions.setData({started: true, complete: false, failed: false}));
  };
}