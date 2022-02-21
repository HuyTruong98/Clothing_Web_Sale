/* eslint-disable no-unused-vars */
import * as Types from '../../../constants/ActionType';
import callApi from '../../../constants/api';
import * as api from '../../../constants/url';
import * as Message from '../../../constants/Message';
import { manageAlert } from '../../../constants/Alert';

export function actFetchTypesRequest() {
  return (dispatch) => {
    return callApi(`${api.server}/typeProducts`, 'GET', null).then((res) => {
      if (res) {
        dispatch(actFetchTypes(res.data))
      }
    });
  }
}

export const actFetchTypes = (data) => {
  return {
    type: Types.FETCH_TYPES,
    data,
  };
};

export function actCreateTypeRequest(value) {
  return (dispatch) => {
    return callApi(`${api.server}/typeProducts`, 'POST', value).then((res) => {
      if (res) {
        manageAlert(Message.THEM_THANH_CONG);
        dispatch(actCreateType(res.data));
      }
    });
  };
}

export const actCreateType = (value) => {
  return {
    type: Types.CREATE_TYPES,
    value,
  };
};

export function actDeleteTypeRequest(id) {
  return (dispatch) => {
    return callApi(`${api.server}/typeProducts/${id}`, 'DELETE', null).then((res) => {
      if (res) {
        manageAlert(Message.XOA_THANH_CONG);
        dispatch(actDeleteType(id));
      }
    });
  };
}

export const actDeleteType = (id) => {
  return {
    type: Types.DELETE_TYPES,
    id,
  };
};

export function actGetTypeByIdRequest(id) {
  return (dispatch) => {
    return callApi(`${api.server}/typeProducts/${id}`, 'GET', null).then((res) => {
      if (res) {
        dispatch(actGetTypeById(res.data));
      }
    });
  };
}

export const actGetTypeById = (value) => {
  return {
    type: Types.EDIT_TYPES,
    value,
  };
};

export function actUpdateTypeRequest(value) {
  return (dispatch) => {
    return callApi(`${api.server}/typeProducts/${value._id}`, 'PATCH', value).then((res) => {
      if (res) {
        manageAlert(Message.SUA_THANH_CONG);
        dispatch(actUpdateType(res.data));
      }
    });
  };
}

export const actUpdateType = (value) => {
  return {
    type: Types.UPDATE_TYPES,
    value,
  };
};