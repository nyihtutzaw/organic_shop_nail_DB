import axios from "axios";
import {
  SHOW_MEMBERS,
  SHOW_MEMBER,
  CREATE_MEMBERS,
  UPDATE_MEMBERS,
  FILTER_MEMBERS,
  ERROR_ITEM
} from "../type";
import { apiUrl } from "../../constants/url";
export const showMembers = (members) => ({
  type: SHOW_MEMBERS,
  members
});

export const showMember = (member) => ({
  type: SHOW_MEMBER,
  member
});

export const createMembers = (member) => ({
  type: CREATE_MEMBERS,
  member
});

export const filterMembers = (id) => ({
  type: FILTER_MEMBERS,
  id
});

export const updateMembers = (data) => ({
  type: UPDATE_MEMBERS,
  data
});

export const setItemError = (error) => ({
  type: ERROR_ITEM,
  error
});


export const getMembers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${apiUrl}members`
      );
      const result = response.data.data.map((member) => {
        return {
          ...member,
          key: member.id
        };
      });
      // console.log(response.status)
      if (response.status === 200) {
        dispatch(showMembers(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setItemError(error.response.data.data));
      } else {
        dispatch(setItemError(error.response.data));
      }
    }
  };
};


export const getMember = (id) => {
  return async (dispatch) => {
    try {
      // console.log(id);
      const response = await axios.get(
        `${apiUrl}members/${id}`
      );
      const result = response.data.data;
      // console.log(result);
      if (response.status === 200) {
        dispatch(showMember(result));
      }
    } catch (error) {
      if (error) {
        dispatch(setItemError(error));
      } else {
        dispatch(setItemError(error));
      }
    }
  };
};


export const saveMembers = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${apiUrl}members`,
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      if (response.status === 201) {
        dispatch(createMembers(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setItemError(error.response.data.data));
      } else {
        dispatch(setItemError(error.response.data));
      }
    }
  };
};

export const deleteMembers = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${apiUrl}members/${id}`
      );
      if (response.status === 204) {
        dispatch(filterMembers(id));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setItemError(error.response.data.data));
      } else {
        dispatch(setItemError(error.response.data));
      }
    }
  };
};

export const editMembers = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${apiUrl}members/${id}?_method=put`,
        data
      );
      // console.log(response.status);
      const result = response.data.data;
      // console.log(result)
      if (response.status === 201) {
        dispatch(updateMembers(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setItemError(error.response.data.data));
      } else {
        dispatch(setItemError(error.response.data));
      }
    }
  };
};
