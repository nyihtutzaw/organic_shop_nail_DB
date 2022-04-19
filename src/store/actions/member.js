import axios from "axios";
import {
  SHOW_MEMBERS,
  SHOW_MEMBER,
  CREATE_MEMBERS,
  UPDATE_MEMBERS,
  FILTER_MEMBERS,
  IS_SUCCESS_MEMBER,
  ERROR_MEMBER,
  CLEAR_ALERT_MEMBER
} from "../type";
import { useDispatch } from "react-redux";

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

export const memberSuccess = (isSuccess) => ({
  type: IS_SUCCESS_MEMBER,
  isSuccess
});

export const setMemberError = (error) => ({
  type: ERROR_MEMBER,
  error
});

export const clearAlertMember = () => ({
  type: CLEAR_ALERT_MEMBER
});

export const getMembers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/members"
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
        dispatch(setMemberError(error.response.data.data));
      }
    }
  };
};

export const getMember = (id) => {
  return async (dispatch) => {
    dispatch(memberSuccess(false));
    try {
      // console.log(id);
      const response = await axios.get(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/members/${id}`
      );
      const result = response.data.data;
      // console.log(result);
      if (response.status === 200) {
        dispatch(showMember(result));
      }
    } catch (error) {
      if (error) {
        dispatch(setMemberError(error));
      }
    }
  };
};

export const saveMembers = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/members",
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
      if (error.response.status >= 400) {
        dispatch(setMemberError("There was an error during Creating....!"));
      }
    }
  };
};

export const deleteMembers = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/members/${id}`
      );
      if (response.status === 204) {
        dispatch(filterMembers(id));
      }
    } catch (error) {
      if (error.response.status >= 400) {
        dispatch(setMemberError("There was an error during Deleting....!"));
      }
    }
  };
};

export const editMembers = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/members/${id}?_method=put`,
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
        dispatch(setMemberError(error.response.data.data));
      }
    }
  };
};
