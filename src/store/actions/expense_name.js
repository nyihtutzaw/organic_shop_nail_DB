import axios from "axios";
import {
  SHOW_EXPENSENAMES,
  SHOW_EXPENSENAME,
  CREATE_EXPENSENAMES,
  UPDATE_EXPENSENAMES,
  FILTER_EXPENSENAMES,
  ERROR_ITEM
} from "../type";

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
    try {
      const response = await axios.get(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/expense-names"
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
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setExpenseNamesError(error.response.data.data));
      } else {
        dispatch(setExpenseNamesError(error.response.data));
      }
    }
  };
};


export const getExpenseName = (id) => {
  return async (dispatch) => {
    try {
      // console.log(id);
      const response = await axios.get(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/expense-names/${id}`
      );
      const result = response.data.data;
      // console.log(result)
      if (response.status === 200) {
        dispatch(showExpenseName(result));
      }
    } catch (error) {
      if (error) {
        dispatch(setExpenseNamesError(error));
      } else {
        dispatch(setExpenseNamesError(error));
      }
    }
  };
};

export const saveExpenseNames = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/expense-names",
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      if (response.status === 201) {
        dispatch(createExpenseNames(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setExpenseNamesError(error.response.data.data));
      } else {
        dispatch(setExpenseNamesError(error.response.data));
      }
    }
  };
};

export const deleteExpenseNames = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/expense-names/${id}`
      );
      if (response.status === 204) {
        dispatch(filterExpenseNames(id));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setExpenseNamesError(error.response.data.data));
      } else {
        dispatch(setExpenseNamesError(error.response.data));
      }
    }
  };
};


export const editExpenseNames = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/expense-names/${id}?_method=put`,
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
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setExpenseNamesError(error.response.data.data));
      } else {
        dispatch(setExpenseNamesError(error.response.data));
      }
    }
  };
};
