import axios from "axios";
<<<<<<< HEAD
import {
  SET_REPORTS,
  ADD_ERROR,
  REMOVE_ERROR,
  SET_LOADING,
  SET_SUCCESS
} from "../type";
import { serverErrorMessage } from "../../util/messages";


=======
import { SET_REPORTS } from "../type";
import { apiUrl } from "../../constants/url";
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
export const setReport = (report) => ({
  type: SET_REPORTS,
  report
});


export const getReport = (query) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(
        `${apiUrl}report/sale?${new URLSearchParams(
          query
        ).toString()}`
      );
      const result = {
        ...response.data,
        key: response.data.sale_total
      };

      dispatch(setReport(result));
      dispatch({
        type: REMOVE_ERROR
      });
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message
        });
      }

      if (status >= 400) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage
        });
      }
    }
    dispatch({ type: SET_LOADING });
  };
};
