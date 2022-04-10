import axios from "axios";
import {
  SHOW_STAFFS,
  CREATE_STAFFS,
  UPDATE_STAFFS,
  FILTER_STAFFS,
  ERROR_STAFFS,
} from "../type";
import { apiUrl } from "../../constants/url";

export const showStaffs = (staffs) => ({
  type: SHOW_STAFFS,
  staffs,
});

export const createStaffs = (staff) => ({
  type: CREATE_STAFFS,
  staff,
});

export const filterStaffs = (id) => ({
  type: FILTER_STAFFS,
  id,
});

export const updateStaffs = (data) => ({
  type: UPDATE_STAFFS,
  data,
});

export const setStaffErrors = (error) => ({
  type: ERROR_STAFFS,
  error,
});

export const getStaffs = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${apiUrl}staffs`
      );
      const result = response.data.data.map((item) => {
        return {
          ...item,
          key: item.id,
        };
      });
      // console.log(response.status)
      if (response.status === 200) {
        dispatch(showStaffs(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setStaffErrors(error.response.data.data));
      } else {
        dispatch(setStaffErrors(error.response.data));
      }
    }
  };
};

export const saveStaffs = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${apiUrl}staffs`,
        data
      );
      // console.log(response);
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setStaffErrors(error.response.data.data));
      } else {
        dispatch(setStaffErrors(error.response.data));
      }
    }
  };
};

export const deleteStaffs = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${apiUrl}staffs/${id}`
      );
      if (response.status === 204) {
        dispatch(filterStaffs(id));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setStaffErrors(error.response.data.data));
      } else {
        dispatch(setStaffErrors(error.response.data));
      }
    }
  };
};

export const editStaffs = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${apiUrl}staffs/${id}?_method=put`,
        data
      );
      //   console.log(response);
      const result = response.data.data;
      if (response.status === 204) {
        dispatch(updateStaffs(result));
      }
    } catch (error) {
      console.log(error);
      // if (error) {
      //   dispatch(setStaffErrors(error.response.data.data));
      // } else {
      //   dispatch(setStaffErrors(error.response.data));
      // }
    }
  };
};

export const getStaffReport = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${apiUrl}staffReport?${new URLSearchParams(
          query
        ).toString()}`
      );
      const result = response.data.map((report) => {
        return {
          ...report,
          key: report.id,
        };
      });
      if (response.status === 200) {
        dispatch(showStaffs(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setStaffErrors(error.response.data.data));
      } else {
        dispatch(setStaffErrors(error.response.data));
      }
    }
  };
};
