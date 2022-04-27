import axios from "axios";
import {
  SHOW_EXPENSENAMES,
  SHOW_EXPENSENAME,
  CREATE_EXPENSENAMES,
  UPDATE_EXPENSENAMES,
  FILTER_EXPENSENAMES,
  ERROR_ITEM,


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
export const showExpenseNames = (expenseNames) => ({
  type: SHOW_EXPENSENAMES,
  expenseNames
});

export const showExpenseName = (expenseName) => ({
  type: SHOW_EXPENSENAME,
  expenseName
});

export const createExpenseNames = (expenseName) => ({
  type: CREATE_EXPENSENAMES,
  expenseName
});

export const filterExpenseNames = (id) => ({
  type: FILTER_EXPENSENAMES,
  id
});

export const updateExpenseNames = (data) => ({
  type: UPDATE_EXPENSENAMES,
  data
});

export const setExpenseNamesError = (error) => ({
  type: ERROR_ITEM,
  error
});

export const getExpenseNames = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(
        `${apiUrl}expense-names`
      );
      const result = response.data.data.map((name) => {
        return {
          ...name,
          key: name.id
        };
      });
    //   console.log(result)
      if (response.status === 200) {
        dispatch(showExpenseNames(result));
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


export const getExpenseName = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(
        `${apiUrl}expense-names/${id}`
      );
      const result = response.data.data;
      if (response.status === 200) {
        dispatch(showExpenseName(result));
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

export const saveExpenseNames = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}expense-names`,
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      if (response.status === 201) {
        dispatch(createExpenseNames(result));
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

export const deleteExpenseNames = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(
        `${apiUrl}expense-names/${id}`
      );
      if (response.status === 204) {
        dispatch(filterExpenseNames(id));
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


export const editExpenseNames = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}expense-names/${id}?_method=put`,
        data
      );
      const result = response.data.data;
      const resultName = {
          ...result,
          key: result.id
        }
        // console.log(resultName)
      if (response.status === 201) {
        dispatch(updateExpenseNames(resultName));
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
