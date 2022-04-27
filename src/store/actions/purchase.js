import axios from "axios";
import {
  SHOW_PURCHASES,
  SHOW_PURCHASE,
  SHOW_PURCHASE_REPORT,
  CREATE_PURCHASES,
  UPDATE_PURCHASES,
  FILTER_PURCHASES,
  ERROR_PURCHASES,
  
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
export const showPurchases = (purchases) => ({
  type: SHOW_PURCHASES,
  purchases
});

export const showPurchase = (purchase) => ({
  type: SHOW_PURCHASE,
  purchase
});

export const showPurchaseReport = (purchaseReport) => ({
  type: SHOW_PURCHASE_REPORT,
  purchaseReport
});

export const createPurchases = (purchase) => ({
  type: CREATE_PURCHASES,
  purchase
});

export const filterPurchases = (id) => ({
  type: FILTER_PURCHASES,
  id
});

export const updatePurchases = (data) => ({
  type: UPDATE_PURCHASES,
  data
});

export const setPurchaseErrors = (error) => ({
  type: ERROR_PURCHASES,
  error
});

<<<<<<< HEAD
=======

>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
export const getBestPurchase = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
<<<<<<< HEAD
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/purchaseReport?${new URLSearchParams(
=======
        `${apiUrl}purchaseReport?${new URLSearchParams(
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
          query
        ).toString()}`
      );
      // console.log(response.data.data);
      const result = response.data.data.map((purchase) => {
        return {
          ...purchase,
<<<<<<< HEAD
          key: Math.random() * 100
=======
          key: purchase.id
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
        };
      });
      // console.log(result);
      // dispatch(showPurchases(result));
      dispatch(showPurchaseReport(result));
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setPurchaseErrors(error.response.data.data));
      }
    }
  };
};

export const getPurchase = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(
        `${apiUrl}purchases/${id}`
      );
      const result = response.data.data;
      if (response.status === 200) {
        dispatch(showPurchase(result));
        dispatch({
          type: REMOVE_ERROR
        });
      }
    } catch (error) {
<<<<<<< HEAD
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
=======
      if (error.response.status === 404) {
        dispatch(setPurchaseErrors(error.response.data.data));
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
      }
    }
    dispatch({ type: SET_LOADING });
  };
};

export const getPurchases = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(
        `${apiUrl}purchases`
      );
<<<<<<< HEAD
=======
      // console.log('ss',response);

>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
      const result = response.data.data.map((purchase) => {
        return {
          ...purchase,
          key: purchase.id
        };
      });
      // console.log(result);
      if (response.status === 200) {
        dispatch(showPurchases(result));
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

export const savePurchases = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}purchases`,
        data
      );
      dispatch({ type: SET_SUCCESS, payload: true });
      dispatch({
        type: REMOVE_ERROR
      });
      // console.log(response);
    } catch (error) {
      const { status, data } = error.response;
      if (status === 401) {
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

export const deletePurchases = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(
        `${apiUrl}purchases/${id}`
      );
      // console.log(response)
      // if (response.status === 204) {
      dispatch(filterPurchases(id));
      dispatch({ type: SET_SUCCESS, payload: true });
      dispatch({
        type: REMOVE_ERROR
      });
      // }
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

export const editPurchases = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}items/${id}?_method=put`,
        data
      );
      // console.log(response);
      const result = response.data.data;
      if (response.status === 204) {
        dispatch(updatePurchases(result));
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

export const getPurchaseReport = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/purchaseReport"
      );
      const result = response.data.data.map((purchase) => {
        return {
          ...purchase,
          key: purchase.merchant_id
        };
      });
      // console.log("rr",result)
      if (response.status === 201) {
        dispatch(showPurchaseReport(result));
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

export const getPurchaseReport = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${apiUrl}purchaseReport`
      );
      const result = response.data.data.map((purchase) => {
        return {
          ...purchase,
          key: purchase.merchant_id
        };
      });
      // console.log(result)
      if (response.status === 201) {
        dispatch(showPurchaseReport(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setPurchaseErrors(error.response.data.data));
      }
    }
  };
};
