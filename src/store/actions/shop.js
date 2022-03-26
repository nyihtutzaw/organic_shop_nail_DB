import axios from "axios";
import { SHOW_SHOPS, CREATE_SHOPS, UPDATE_SHOPS, FILTER_SHOPS } from "../type";

export const showShops = (shops) => ({
  type: SHOW_SHOPS,
  shops
});

export const createShops = (shop) => ({
  type: CREATE_SHOPS,
  shop
});

export const filterShops = (id) => ({
  type: FILTER_SHOPS,
  id
});

export const updateShops = (data) => ({
  type: UPDATE_SHOPS,
  data
});


export const getShops = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/shops"
      );
      const result = response.data.data.map((data) => {
        return {
          ...data,
          key: data.id
        };
      });
      dispatch(showShops(result));
    } catch (error) {
      console.log(error);
    }
  };
};

export const saveShops = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/shops",
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      dispatch(createShops(result));
    } catch (error) {}
  };
};

export const deleteShops = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/shops/${id}`
      );
      dispatch(filterShops(id));
    } catch (error) {}
  };
};

export const editShops = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/shops/${data.id}?_method=put`,
        data
      );
      dispatch(updateShops(data));
    } catch (error) {}
  };
};
