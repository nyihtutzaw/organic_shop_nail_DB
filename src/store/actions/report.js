import axios from "axios";
import { SET_REPORTS } from "../type";
import { apiUrl } from "../../constants/url";
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
