import axios from "axios";
import {
  SHOW_MERCHANTS,
  SHOW_MERCHANT,
  CREATE_MERCHANTS,
  UPDATE_MERCHANTS,
  FILTER_MERCHANTS,
  ERROR_ITEM
} from "../type";

export const showMerchants = (merchants) => ({
  type: SHOW_MERCHANTS,
  merchants
});

export const showMerchant = (merchant) => ({
  type: SHOW_MERCHANT,
  merchant
});

export const createMerchants = (merchant) => ({
  type: CREATE_MERCHANTS,
  merchant
});

export const filterMerchants = (id) => ({
  type: FILTER_MERCHANTS,
  id
});

export const updateMerchants = (data) => ({
  type: UPDATE_MERCHANTS,
  data
});

export const setMerchantError = (error) => ({
  type: ERROR_ITEM,
  error
});

export const getMerchants = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/merchants"
      );
      const result = response.data.data.map((merchant) => {
        return {
          ...merchant,
          key: merchant.id
        };
      });
      // console.log(result)
      // console.log(response.status)
      if (response.status === 200) {
        dispatch(showMerchants(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setMerchantError(error.response.data.data));
      } else {
        dispatch(setMerchantError(error.response.data));
      }
    }
  };
};

export const getMerchant = (id) => {
  return async (dispatch) => {
    try {
      // console.log(id);
      const response = await axios.get(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/merchants/${id}`
      );
      const result = response.data.data;
      // console.log(result);
      if (response.status === 200) {
        dispatch(showMerchant(result));
      }
    } catch (error) {
      if (error) {
        dispatch(setMerchantError(error));
      } else {
        dispatch(setMerchantError(error));
      }
    }
  };
};

export const saveMerchants = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/merchants",
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      // console.log(result)
      if (response.status === 201) {
        dispatch(createMerchants(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setMerchantError(error.response.data.data));
      } else {
        dispatch(setMerchantError(error.response.data));
      }
    }
  };
};

export const deleteMerchants = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/merchants/${id}`
      );
      if (response.status === 204) {
        dispatch(filterMerchants(id));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setMerchantError(error.response.data.data));
      } else {
        dispatch(setMerchantError(error.response.data));
      }
    }
  };
};

export const editMerchants = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/merchants/${id}?_method=put`,
        data
      );
      // console.log(response.status);
      const result = response.data.data;
      const resultMerchant = {
        ...result,
        key: result.id
      };
      // console.log(result)
      if (response.status === 201) {
        dispatch(updateMerchants(resultMerchant));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setMerchantError(error.response.data.data));
      } else {
        dispatch(setMerchantError(error.response.data));
      }
    }
  };
};
