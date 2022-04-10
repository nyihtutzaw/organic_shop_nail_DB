import axios from "axios";
import {
  SHOW_BADITEMS,
  SHOW_BADITEM,
  CREATE_BADITEMS,
  UPDATE_BADITEMS,
  FILTER_BADITEMS,
  ERROR_BADITEMS,
  IS_SUCCESS_ERROR_BADITEMS
} from "../type";
import { apiUrl } from "../../constants/url";

export const showBadItems = (baditems) => ({
  type: SHOW_BADITEMS,
  baditems
});

export const showBadItem = (baditem) => ({
  type: SHOW_BADITEM,
  baditem
});


export const createBadItems = (baditem) => ({
  type: CREATE_BADITEMS,
  baditem
});

export const filterBadItems = (id) => ({
  type: FILTER_BADITEMS,
  id
});

export const updateBadItems = (data) => ({
  type: UPDATE_BADITEMS,
  data
});

export const setBadItemErrors = (error) => ({
  type: ERROR_BADITEMS,
  error
});


export const badItemSuccess = (isSuccess) => ({
  type: IS_SUCCESS_ERROR_BADITEMS,
  isSuccess
});


export const getBadItems = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${apiUrl}damage-items`
      );
      const result = response.data.data.map((baditem) => {
        return {
          ...baditem,
          key: baditem.id
        };
      });
      // console.log(response.status)
      if (response.status === 200) {
        dispatch(showBadItems(result));
      }
    } catch (error) {
      if (error) {
        dispatch(setBadItemErrors(error.response.data.data));
      } else {
        dispatch(setBadItemErrors(error.response.data));
      }
    }
  };
};

export const getBadItem = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${apiUrl}damage-items/${id}`
      );
      const result = response.data.data;
      if (response.status === 200) {
        dispatch(showBadItem(result));
      }
    } catch (error) {
      if (error) {
        dispatch(setBadItemErrors(error));
      }
    }
  };
};


export const saveBadItems = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${apiUrl}damage-items/batchInsert`,
        data
      );
      const result = response.data.data;
      if(response.status === 201){
        dispatch(createBadItems(result))
      }
    } catch (error) {
      if (error) {
        dispatch(setBadItemErrors("There was an Error during Saving...."));
      } 
    }
  };
};

export const deleteBadItems = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${apiUrl}damage-items/${id}`
      );
      if (response.status === 204) {
      dispatch(filterBadItems(id));
      }
    } catch (error) {
      console.log(error)
      if (error) {
        dispatch(setBadItemErrors("There was an error during Deleting"));
      }
    }
  };
};

export const editBadItems = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${apiUrl}damage-items/${id}?_method=put`,
        data
      );
      const result = response.data.data;
      if (response.status === 204) {
        dispatch(updateBadItems(result));
      }
    } catch (error) {
      if (error) {
        dispatch(setBadItemErrors("There was an Error during Updating...."));
      }
    }
  };
};
