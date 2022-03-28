import axios from "axios";
import {
  SHOW_OWNERS,
  SHOW_OWNER,
  CREATE_OWNERS,
  UPDATE_OWNERS,
  FILTER_OWNERS,
  ERROR_OWNER
} from "../type";

export const showOwners = (owners) => ({
  type: SHOW_OWNERS,
  owners
});

export const showOwner = (owner) => ({
  type: SHOW_OWNER,
  owner
});

export const createOwners = (owner) => ({
  type: CREATE_OWNERS,
  owner
});

export const filterOwners = (id) => ({
  type: FILTER_OWNERS,
  id
});

export const updateOwners = (data) => ({
  type: UPDATE_OWNERS,
  data
});

export const setOwnerError = (error) => ({
  type: ERROR_OWNER,
  error
});

export const getOwners = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/owner-used-items"
      );
      const result = response.data.data.map((owner) => {
        return {
          ...owner,
          key: owner.id
        };
      });
      if (response.status === 200) {
        dispatch(showOwners(result));
      }
    } catch (error) {
      if (error) {
        dispatch(setOwnerError(error.response.data.data));
      } else {
        dispatch(setOwnerError(error.response.data));
      }
    }
  };
};

export const getOwner = (id) => {
  return async (dispatch) => {
    try {
      // console.log(id);
      const response = await axios.get(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/owner-used-items/${id}`
      );
      const result = response.data.data;

      if (response.status === 200) {
        dispatch(showOwner(result));
      }
    } catch (error) {
      if (error) {
        dispatch(setOwnerError(error));
      } else {
        dispatch(setOwnerError(error));
      }
    }
  };
};

export const saveOwners = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/owner-used-items",
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      //   console.log(result);
      if (response.status === 201) {
        dispatch(createOwners(result));
      }
    } catch (error) {
      if (error) {
        dispatch(setOwnerError(error.response.data.data));
      } else {
        dispatch(setOwnerError(error.response.data));
      }
    }
  };
};

export const deleteOwners = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/owner-used-items/${id}`
      );
      //   console.log(response)
      if (response.status === 204) {
        dispatch(filterOwners(id));
      }
    } catch (error) {
      if (error) {
        dispatch(setOwnerError(error.response.data.data));
      } else {
        dispatch(setOwnerError(error.response.data));
      }
    }
  };
};

export const editOwners = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/owner-used-items/${id}?_method=put`,
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      if (response.status === 201) {
        dispatch(updateOwners(result));
      }
    } catch (error) {
      if (error) {
        dispatch(setOwnerError(error.response.data.data));
      } else {
        dispatch(setOwnerError(error.response.data));
      }
    }
  };
};
