// http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/stocks

import axios from "axios";
import {
  SHOW_STOCKS,
  ERROR_STOCKS,
  ADD_ERROR,
  REMOVE_ERROR,
  SET_LOADING,
  SET_SUCCESS
} from "../type";
import { serverErrorMessage } from "../../util/messages";

export const showStocks = (stocks) => ({
  type: SHOW_STOCKS,
  stocks
});

// export const createPurchases = (purchase) => ({
//   type: CREATE_PURCHASES,
//   purchase
// });

// export const filterPurchases = (id) => ({
//   type: FILTER_PURCHASES,
//   id
// });

// export const updatePurchases = (data) => ({
//   type: UPDATE_PURCHASES,
//   data
// });

export const setStockError = (error) => ({
  type: ERROR_STOCKS,
  error
});

export const getStocks = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/stocks"
      );
      const result = response.data.data.map((stock) => {
        return {
          ...stock,
          key: stock.id
        };
      });
      // console.log(response.status)
      if (response.status === 200) {
        dispatch(showStocks(result));
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

export const saveStocks = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/stocks",
        data
      );
      dispatch({ type: SET_SUCCESS, payload: true });
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

// export const deletePurchases = (id) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.delete(
//         `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/items/${id}`
//       );
//       // console.log(response)
//       if (response.status === 204) {
//         dispatch(filterPurchases(id));
//       }
//     } catch (error) {
//       if (error.response.status === 404) {
//         dispatch(setPurchaseErrors(error.response.data.data));
//       } else {
//         dispatch(setPurchaseErrors(error.response.data));
//       }
//     }
//   };
// };

// export const editPurchases = (id, data) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.post(
//         `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/items/${id}?_method=put`,
//         data
//       );
//       // console.log(response);
//       const result = response.data.data;
//       if (response.status === 204) {
//         dispatch(updatePurchases(result));
//       }
//     } catch (error) {
//       console.log(error);
//       // if (error) {
//       //   dispatch(setItemErrors(error.response.data.data));
//       // } else {
//       //   dispatch(setItemErrors(error.response.data));
//       // }
//     }
//   };
// };
