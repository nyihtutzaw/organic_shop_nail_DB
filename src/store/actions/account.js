import axios from "axios";
import {
  SHOW_ACCOUNTS,
  CREATE_ACCOUNTS,
  UPDATE_ACCOUNTS,
  FILTER_ACCOUNTS,
  ERROR_ACCOUNT,
} from "../type";

export const showAccounts = (accounts) => ({
  type: SHOW_ACCOUNTS,
  accounts,
});

export const createAccounts = (account) => ({
  type: CREATE_ACCOUNTS,
  account,
});

export const filterAccounts = (id) => ({
  type: FILTER_ACCOUNTS,
  id,
});

export const updateAccounts = (data) => ({
  type: UPDATE_ACCOUNTS,
  data,
});

export const setAccountErrors = (error) => ({
  type: ERROR_ACCOUNT,
  error,
});

export const getAccounts = () => {
  return async (dispatch) => {
    try {
      alert("hi");
      const response = await axios.get(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/user"
      );
      const result = response.data.data.map((member) => {
        return {
          ...member,
          key: member.id,
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
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/io-register",
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id,
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
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/members/${id}`
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

export const editAccounts = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/members/${id}?_method=put`,
        data
      );
      // console.log(response.data.data)
      // console.log(response.status);
      const result = response.data.data;
      if (response.status === 201) {
        dispatch(updateAccounts(result));
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
