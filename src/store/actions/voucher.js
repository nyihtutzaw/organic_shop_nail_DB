import axios from "axios";
import {
  SHOW_VOUCHERS,
  FILTER_VOUCHERS,
  ERROR_VOUCHERS,
  ADD_ERROR,
  REMOVE_ERROR,
  SET_LOADING,
  SET_SUCCESS,
} from "../type";
import { apiUrl } from "../../constants/url";
import { serverErrorMessage } from "../../util/messages";

export const showVouchers = (vouchers) => ({
  type: SHOW_VOUCHERS,
  vouchers,
});

export const filterVouchers = (id) => ({
  type: FILTER_VOUCHERS,
  id,
});

export const setVoucherErrors = (error) => ({
  type: ERROR_VOUCHERS,
  error,
});

export const getVouchers = (query) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(
        `${apiUrl}invoices?${new URLSearchParams(query).toString()}`
      );
      const result = response.data.data.map((voucher) => {
        return {
          ...voucher,
          key: voucher.id,
        };
      });
      //   console.log("rr",result)
      if (response.status === 200) {
        dispatch(showVouchers(result));
        dispatch({
          type: REMOVE_ERROR,
        });
      }
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message,
        });
      }

      if (status >= 400) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage,
        });
      }
    }
    dispatch({ type: SET_LOADING });
  };
};

export const deleteVouchers = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(`${apiUrl}invoices/${id}`);
      console.log(response.data.data);
      if (response.status === 204) {
        dispatch(filterVouchers(id));
        dispatch({ type: SET_SUCCESS, payload: true });
        dispatch({
          type: REMOVE_ERROR,
        });
      }
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message,
        });
      }

      if (status >= 400) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage,
        });
      }
    }
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
  };
};

// export const getItem = (id) => {
//   return async (dispatch) => {
//     try {
//       // console.log(id);
//       const response = await axios.get(
//         `${apiUrl}items/${id}`
//       );
//       const result = response.data.data;
//       // console.log(result)
//       if (response.status === 200) {
//         dispatch(showItem(result));
//       }
//     } catch (error) {
//       if (error) {
//         dispatch(setItemErrors(error));
//       } else {
//         dispatch(setItemErrors(error));
//       }
//     }
//   };
// };

// export const saveItems = (data) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.post(
//         "${apiUrl}items/batchInsert",
//         data
//       );
//       // console.log(response.data.data)
//       const result = {
//         ...response.data.data,
//         key: response.data.data.id
//       };
//       if (response.status === 201) {
//         dispatch(createItems(result));
//       }
//         // console.log("result",result);
//     } catch (error) {
//       if (error) {
//         dispatch(setItemErrors(error.response.data.data));
//       } else {
//         dispatch(setItemErrors(error.response.data));
//       }
//     }
//   };
// };

// export const deleteItems = (id) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.delete(
//         `${apiUrl}items/${id}`
//       );
//       // console.log(response)
//       if (response.status === 204) {
//         dispatch(filterItems(id));
//       }
//     } catch (error) {
//       if (error.response.status === 404) {
//         dispatch(setItemErrors(error.response.data.data));
//       } else {
//         dispatch(setItemErrors(error.response.data));
//       }
//     }
//   };
// };

// export const editItems = (id, data) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.post(
//         `${apiUrl}items/${id}?_method=put`,
//         data
//       );
//       const result = {
//         ...response.data.data,
//         key: response.data.data.id
//       };
//       // console.log(result);
//       if (response.status === 204) {
//         dispatch(updateItems(result));
//       }
//     } catch (error) {
//       console.log(error);
//       if (error) {
//         dispatch(setItemErrors(error.response.data.data));
//       } else {
//         dispatch(setItemErrors(error.response.data));
//       }
//     }
//   };
// };
