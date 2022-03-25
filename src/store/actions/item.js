import axios from "axios";
import {
  SHOW_ITEMS,
  CREATE_ITEMS,
  UPDATE_ITEMS,
  FILTER_ITEMS,
  ERROR_ITEM
} from "../type";

export const showItems = (items) => ({
  type: SHOW_ITEMS,
  items
});

export const createItems = (item) => ({
  type: CREATE_ITEMS,
  item
});

export const filterItems = (id) => ({
  type: FILTER_ITEMS,
  id
});

export const updateItems = (data) => ({
  type: UPDATE_ITEMS,
  data
});

export const setItemErrors = (error) => ({
  type: ERROR_ITEM,
  error
});

export const getItems = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/items"
      );
      const result = response.data.data.map((item) => {
        return {
          ...item,
          key: item.id
        };
      });
      // console.log(response.status)
      if (response.status === 200) {
        dispatch(showItems(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setItemErrors(error.response.data.data));
      } else {
        dispatch(setItemErrors(error.response.data));
      }
    }
  };
};

export const saveItems = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/items/batchInsert",
        data
      );
      // console.log(response);
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setItemErrors(error.response.data.data));
      } else {
        dispatch(setItemErrors(error.response.data));
      }
    }
  };
};

export const deleteItems = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/items/${id}`
      );
      // console.log(response)
      if (response.status === 204) {
        dispatch(filterItems(id));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setItemErrors(error.response.data.data));
      } else {
        dispatch(setItemErrors(error.response.data));
      }
    }
  };
};

export const editItems = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/items/${id}?_method=put`,
        data
      );
      // console.log(response);
      const result = response.data.data;
      if (response.status === 204) {
        dispatch(updateItems(result));
      }
    } catch (error) {
      console.log(error);
      // if (error) {
      //   dispatch(setItemErrors(error.response.data.data));
      // } else {
      //   dispatch(setItemErrors(error.response.data));
      // }
    }
  };
};
