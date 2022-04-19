import axios from "axios";
import {
  SHOW_STAFFS,
  CREATE_STAFFS,
  UPDATE_STAFFS,
  FILTER_STAFFS,
  ERROR_STAFFS,
  IS_SUCCESS_STAFFS,
  CLEAR_ALERT_STAFFS
} from "../type";

export const showStaffs = (staffs) => ({
  type: SHOW_STAFFS,
  staffs
});

export const createStaffs = (staff) => ({
  type: CREATE_STAFFS,
  staff
});

export const filterStaffs = (id) => ({
  type: FILTER_STAFFS,
  id
});

export const updateStaffs = (data) => ({
  type: UPDATE_STAFFS,
  data
});

export const setStaffErrors = (error) => ({
  type: ERROR_STAFFS,
  error
});

export const staffSuccess = (isSuccess) => ({
  type: IS_SUCCESS_STAFFS,
  isSuccess
});

export const clearAlertStaffs = () => ({
  type: CLEAR_ALERT_STAFFS
});


// export const getBestDailyStaff = (query) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(
//         `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/daily-fees/bestDaily?${new URLSearchParams(
//           query
//         ).toString()}`
//       );
//       console.log("aa", query.best);
//       const result = response.data.data.map((service) => {
//         return {
//           ...service,
//           key: service.id
//         };
//       });
//       dispatch(showStaffs(result));
//     } catch (error) {
//       if (error.response.status === 404) {
//         dispatch(setStaffErrors(error.response.data.data));
//       }
//     }
//   };
// };

export const getStaffs = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/staffs"
      );
      const result = response.data.data.map((item) => {
        return {
          ...item,
          key: item.id
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
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/staffs",
        data
      );
      // console.log(response);
    } catch (error) {
      if (error.response.status >= 400) {
        dispatch(setStaffErrors("There was an error during Creating...!"));
      }
    }
  };
};

export const deleteStaffs = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/staffsc/${id}`
      );
      if (response.status === 204) {
        dispatch(filterStaffs(id));
      }
    } catch (error) {
      if (error.response.status >= 400) {
        dispatch(setStaffErrors("There was an error during Deleting..."));
      }
    }
  };
};

export const editStaffs = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/staffs/${id}?_method=put`,
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
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/staffReport?${new URLSearchParams(
          query
        ).toString()}`
      );
      const result = response.data.map((report) => {
        return {
          ...report,
          key: report.id
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
