import axios from "axios";
import {
  SHOW_MEMBERS,
  SHOW_MEMBER,
  CREATE_MEMBERS,
  UPDATE_MEMBERS,
  FILTER_MEMBERS,
  ERROR_MEMBER,
  IS_SUCCESS_MEMBER,
  CLEAR_ALERT_MEMBER,

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

export const setMemberError = (error) => ({
  type: ERROR_MEMBER,
  error
});

export const memberSuccess = (isSuccess) => ({
  type: IS_SUCCESS_MEMBER,
  isSuccess
});

export const clearAlertMember = () => ({
  type: CLEAR_ALERT_MEMBER
});

export const getMembers = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

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

export const getMember = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      // console.log(id);
      const response = await axios.get(
        `${apiUrl}members/${id}`
      );
      const result = response.data.data;
      // console.log(result);
      if (response.status === 200) {
        dispatch(showMember(result));
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

export const saveMembers = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
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
        dispatch({ type: SET_SUCCESS, payload: true });
        dispatch({
          type: REMOVE_ERROR
        });
      }
    } catch (error) {
      const { status, data } = error.response;
      if (status === 400) {
        dispatch({
          type: ADD_ERROR,
          payload: "The code has already been taken."
        });
      } else if (status === 401) {
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

export const deleteMembers = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(
        `${apiUrl}members/${id}`
      );
      if (response.status === 204) {
        dispatch(filterMembers(id));
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

export const editMembers = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
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
