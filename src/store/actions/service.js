import axios from "axios";
import {
  SHOW_SERVICES,
  SHOW_SERVICE,
  CREATE_SERVICES,
  UPDATE_SERVICES,
  FILTER_SERVICES,
  ERROR_SERVICES,
  IS_SUCCESS_SERVICES,
  CLEAR_ALERT_SERVICES,

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

export const showServices = (services) => ({
  type: SHOW_SERVICES,
  services
});

export const showService = (service) => ({
  type: SHOW_SERVICE,
  service
});

export const createServices = (service) => ({
  type: CREATE_SERVICES,
  service
});

export const filterServices = (id) => ({
  type: FILTER_SERVICES,
  id
});

export const updateServices = (data) => ({
  type: UPDATE_SERVICES,
  data
});

export const setServiceError = (error) => ({
  type: ERROR_SERVICES,
  error
});
export const serviceSuccess = (isSuccess) => ({
  type: IS_SUCCESS_SERVICES,
  isSuccess
});

<<<<<<< HEAD
export const clearAlertServices = () => ({
  type: CLEAR_ALERT_SERVICES
});

=======
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
export const getBestService = (query) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(
<<<<<<< HEAD
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/services/bestService?${new URLSearchParams(
=======
        `${apiUrl}services/bestService?${new URLSearchParams(
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
          query
        ).toString()}`
      );
      const result = response.data.data.map((service) => {
        return {
          ...service,
          key: service.id
        };
      });
      dispatch(showServices(result));
<<<<<<< HEAD
      dispatch({
        type: REMOVE_ERROR
      });
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
=======
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setServiceError(error.response.data.data));
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
      }
    }
    dispatch({ type: SET_LOADING });

  };
};

export const getServices = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(
        `${apiUrl}services`
      );
      const result = response.data.data.map((service) => {
        return {
          ...service,
          key: service.id
        };
      });
<<<<<<< HEAD
      // console.log(result);
=======

>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
      if (response.status === 200) {
        dispatch(showServices(result));
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

export const getService = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(
        `${apiUrl}services/${id}`
      );
      const result = response.data.data;
      if (response.status === 200) {
        dispatch(showService(result));
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

export const saveServices = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}services/batchInsert`,
        data
      );
      const result = response.data.data.map((service) => {
        return {
          ...service,
          key: service.id
        };
      });
<<<<<<< HEAD
      // console.log(response)
=======
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
      if (response.status === 201) {
        dispatch(createServices(result));
        dispatch({ type: SET_SUCCESS, payload: true });
        dispatch({
          type: REMOVE_ERROR
        });
      }
    } catch (error) {
<<<<<<< HEAD
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
=======
      if (error.response.status === 404) {
        dispatch(setServiceError(error.response.data.data));
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
      }
    }
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
  };
};

export const deleteServices = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(
        `${apiUrl}services/${id}`
      );
      if (response.status === 204) {
        dispatch(filterServices(id));
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

export const editServices = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}services/${id}?_method=put`,
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };

      if (response.status === 201) {
        dispatch(updateServices(result));
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
          payload: "The code has already been taken"
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
