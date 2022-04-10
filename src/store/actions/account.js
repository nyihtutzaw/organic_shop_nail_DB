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
} from "../type";
import { apiUrl } from "../../constants/url";

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
  type: CHANGE_PASSWORD,
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
      // console.log(response.status)
      if (response.status === 200) {
        dispatch(showAccounts(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setAccountErrors(error.response.data.data));
      } else {
        dispatch(setAccountErrors(error.response.data));
      }
    }
  };
};

export const saveAccounts = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${apiUrl}io-register`,
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      // if (response.status === 201) {
      //   dispatch(createAccounts(result));
      // }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setAccountErrors(error.response.data.data));
      } else {
        dispatch(setAccountErrors(error.response.data));
      }
    }
  };
};

export const deleteAccounts = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${apiUrl}users/${id}`
      );
      if (response.status === 204) {
        dispatch(filterAccounts(id));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setAccountErrors(error.response.data.data));
      } else {
        dispatch(setAccountErrors(error.response.data));
      }
    }
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
        `${apiUrl}io-change-password`, data
      );
      // console.log(response.data.data);
      const result = response.data.data;
      dispatch(passwordChange(result))
    } catch (error) {
      if (error.response.status >= 400) {
        dispatch(setAccountErrors("There was an error during Changing Password...."));
      }
    }
  };
};
