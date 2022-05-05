import axios from "axios";
import {
  SET_REPORTS,
  ADD_ERROR,
  REMOVE_ERROR,
  SET_LOADING,
} from "../type";
import { serverErrorMessage } from "../../util/messages";


export const setReport = (report) => ({
  type: SET_REPORTS,
  report
});

export const getReport = (query) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/report/sale?${new URLSearchParams(
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
