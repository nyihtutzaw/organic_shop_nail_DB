import axios from "axios";
import {
  SHOW_STAFFS,
  CREATE_STAFFS,
  UPDATE_STAFFS,
  FILTER_STAFFS,
  ERROR_STAFFS,
  IS_SUCCESS_STAFFS,
  CLEAR_ALERT_STAFFS,

  ADD_ERROR,
  REMOVE_ERROR,
  SET_LOADING,
  SET_SUCCESS
} from "../type";
import { serverErrorMessage } from "../../util/messages";

export const showStaffs = (staffs) => ({
  type: SHOW_STAFFS,
  staffs
});

export const createStaffs = (staff) => ({
  type: CREATE_STAFFS,
  staff
});

export const filterStaffs = (id) => ({
  type: FILTER_STAFFS,
  id
});

export const updateStaffs = (data) => ({
  type: UPDATE_STAFFS,
  data
});

export const setStaffErrors = (error) => ({
  type: ERROR_STAFFS,
  error
});

export const staffSuccess = (isSuccess) => ({
  type: IS_SUCCESS_STAFFS,
  isSuccess
});

export const clearAlertStaffs = () => ({
  type: CLEAR_ALERT_STAFFS
});

// export const getBestDailyStaff = (query) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(
//         `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/daily-fees/bestDaily?${new URLSearchParams(
//           query
//         ).toString()}`
//       );
//       console.log("aa", query.best);
//       const result = response.data.data.map((service) => {
//         return {
//           ...service,
//           key: service.id
//         };
//       });
//       dispatch(showStaffs(result));
//     } catch (error) {
//       if (error.response.status === 404) {
//         dispatch(setStaffErrors(error.response.data.data));
//       }
//     }
//   };
// };

export const getStaffs = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(
        `${apiUrl}staffs`
      );
      const result = response.data.data.map((item) => {
        return {
          ...item,
          key: item.id
        };
      });
      if (response.status === 200) {
        dispatch(showStaffs(result));
        dispatch({
          type: REMOVE_ERROR
        })
      }
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

export const saveStaffs = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}staffs`,
        data
      );
      const result = response.data.data;
      if (response.status === 201) {
        dispatch(createStaffs(result));
        dispatch({ type: SET_SUCCESS, payload: true });
        dispatch({
          type: REMOVE_ERROR
        });
      }
    } catch (error) {
      const { status, data } = error.response;
      if (status === 400) {
        dispatch({
          type: ADD_ERROR,
          payload: "The code has already been taken."
        });
      } else if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message
        });
      } else if (status >= 400) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage
        });
      }
    }
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
  };
};

export const deleteStaffs = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(
        `${apiUrl}staffs/${id}`
      );
      if (response.status === 204) {
        dispatch(filterStaffs(id));
        dispatch({ type: SET_SUCCESS, payload: true });
        dispatch({
          type: REMOVE_ERROR
        });
      }
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
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
  };
};

export const editStaffs = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}staffs/${id}?_method=put`,
        data
      );
      //   console.log(response);
      const result = response.data.data;
      if (response.status === 204) {
        dispatch(updateStaffs(result));
        dispatch({ type: SET_SUCCESS, payload: true });
        dispatch({
          type: REMOVE_ERROR
        });
      }
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
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
  };
};

export const getStaffReport = (query) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(
        `${apiUrl}staffReport?${new URLSearchParams(
          query
        ).toString()}`
      );
      const result = response.data.map((report) => {
        return {
          ...report,
          key: report.id
        };
      });
      if (response.status === 200) {
        dispatch(showStaffs(result));
        dispatch({
          type: REMOVE_ERROR
        });
      }
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
