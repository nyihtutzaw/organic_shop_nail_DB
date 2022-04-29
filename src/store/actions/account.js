import axios from "axios";
import {
  SHOW_ACCOUNTS,
  CREATE_ACCOUNTS,
  UPDATE_ACCOUNTS,
  FILTER_ACCOUNTS,
  ERROR_ACCOUNT,
  IS_SUCCESS_ACCOUNT,
  CLEAR_ALERT_ACCOUNT,
  CHANGE_PASSWORD,
  ADD_ERROR,
  REMOVE_ERROR,
  SET_LOADING,
  SET_SUCCESS
} from "../type";
<<<<<<< HEAD
import { serverErrorMessage } from "../../util/messages";
=======
import { apiUrl } from "../../constants/url";
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4

export const showAccounts = (accounts) => ({
  type: SHOW_ACCOUNTS,
  accounts
});

export const createAccounts = (account) => ({
  type: CREATE_ACCOUNTS,
  account
});

export const filterAccounts = (id) => ({
  type: FILTER_ACCOUNTS,
  id
});

export const passwordChange = () => ({
  type: CHANGE_PASSWORD
});

export const updateAccounts = (data) => ({
  type: UPDATE_ACCOUNTS,
  data
});

export const setAccountErrors = (error) => ({
  type: ERROR_ACCOUNT,
  error
});

export const accountSuccess = (isSuccess) => ({
  type: IS_SUCCESS_ACCOUNT,
  isSuccess
});

export const clearAlertAccount = () => ({
  type: CLEAR_ALERT_ACCOUNT
});

export const getAccounts = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(
        `${apiUrl}users`
      );
      const result = response.data.data.map((account) => {
        return {
          ...account,
          key: account.id
        };
      });
      if (response.status === 200) {
        dispatch(showAccounts(result));
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

export const saveAccounts = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}io-register`,
        data
      );

      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      if (response.status === 201) {
        dispatch(createAccounts(result));
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
      } else if (status === 422) {
        dispatch({
          type: ADD_ERROR,
          payload: "The phone has already been taken."
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

export const deleteAccounts = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(
        `${apiUrl}users/${id}`
      );
      if (response.status === 204) {
        dispatch(filterAccounts(id));
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

// export const editAccounts = (id, data) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.post(
//         `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/members/${id}?_method=put`,
//         data
//       );
//       // console.log(response.data.data)
//       // console.log(response.status);
//       const result = response.data.data;
//       if (response.status === 201) {
//         dispatch(updateAccounts(result));
//       }
//     } catch (error) {
//       if (error.response.status === 404) {
//         dispatch(setAccountErrors(error.response.data.data));
//       } else {
//         dispatch(setAccountErrors(error.response.data));
//       }
//     }
//   };
// };

export const changePassword = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
<<<<<<< HEAD
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/io-change-password`,
        data
=======
        `${apiUrl}io-change-password`, data
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
      );
      // console.log(response.data.data);
      const result = response.data.data;
      dispatch(passwordChange(result));
    } catch (error) {
      if (error.response.status >= 400) {
        dispatch(
          setAccountErrors("There was an error during Changing Password....")
        );
      }
    }
  };
};
