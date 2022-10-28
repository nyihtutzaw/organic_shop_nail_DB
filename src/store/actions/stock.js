// ${apiUrl}stocks

import axios from "axios";
import {
  SHOW_STOCKS,
  SHOW_STOCK,
  FILTER_STOCKS,
  UPDATE_STOCKS,
  ERROR_STOCKS,
  ADD_ERROR,
  REMOVE_ERROR,
  SET_LOADING,
  SET_SUCCESS,
} from "../type";
import { apiUrl } from "../../constants/url";
import { serverErrorMessage } from "../../util/messages";

export const showStocks = (stocks) => ({
  type: SHOW_STOCKS,
  stocks,
});

export const showStock = (stock) => ({
  type: SHOW_STOCK,
  stock,
});

export const filterStocks = (id) => ({
  type: FILTER_STOCKS,
  id,
});

export const updateStocks = (data) => ({
  type: UPDATE_STOCKS,
  data,
});

export const setStockError = (error) => ({
  type: ERROR_STOCKS,
  error,
});

export const getStocks = () => {
  return async (dispatch) => {
    // dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(`${apiUrl}stocks`);
      const result = response.data.data.map((stock) => {
        return {
          ...stock,
          key: stock.id,
        };
      });
      // console.log(response.status)
      if (response.status === 200) {
        dispatch(showStocks(result));
        // dispatch({ type: SET_SUCCESS, payload: true });
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
    // dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
  };
};

export const getStock = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(`${apiUrl}stocks/${id}`);
      const result = response.data.data;
      if (response.status === 200) {
        dispatch(showStock(result));
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

export const saveStocks = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post("${apiUrl}stocks", data);
      dispatch({ type: SET_SUCCESS, payload: true });
      dispatch({
        type: REMOVE_ERROR,
      });
    } catch (error) {
      const { status, data } = error.response;
      if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message,
        });
      } else if (status >= 400) {
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

export const deleteStocks = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(`${apiUrl}stocks/${id}`);
      if (response.status === 204) {
        dispatch(filterStocks(id));
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

export const editStocks = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}stocks/${id}?_method=put`,
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id,
      };
      // console.log(result);

      if (response.status === 201) {
        dispatch(updateStocks(result));
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
