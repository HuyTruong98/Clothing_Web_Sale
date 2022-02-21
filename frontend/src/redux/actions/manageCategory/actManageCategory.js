/* eslint-disable no-unused-vars */
import * as Types from '../../../constants/ActionType';
import callApi from '../../../constants/api';
import * as api from '../../../constants/url';
import * as Message from '../../../constants/Message';
import { manageAlert } from '../../../constants/Alert';

export function actFetchCategoriesRequest() {
  return (dispatch) => {
    return callApi(`${api.server}/categories`, 'GET', null).then((res) => {
      if (res) {
        dispatch(actFetchCategories(res.data))
      }
    });
  }
}

export const actFetchCategories = (data) => {
  return {
    type: Types.FETCH_CATEGORIES,
    data,
  };
};

export function actCreateCategoryRequest(value) {
  return (dispatch) => {
    return callApi(`${api.server}/categories`, 'POST', value).then((res) => {
      if (res) {
        manageAlert(Message.THEM_THANH_CONG);
        dispatch(actCreateCategory(res.data));
      }
    });
  };
}

export const actCreateCategory = (value) => {
  return {
    type: Types.CREATE_CATEGORIES,
    value,
  };
};

export function actDeleteCategoryRequest(id) {
  return (dispatch) => {
    return callApi(`${api.server}/categories/${id}`, 'DELETE', null).then((res) => {
      if (res) {
        manageAlert(Message.XOA_THANH_CONG);
        dispatch(actDeleteCategory(id));
      }
    });
  };
}

export const actDeleteCategory = (id) => {
  return {
    type: Types.DELETE_CATEGORIES,
    id,
  };
};

export function actGetCategoryByIdRequest(id) {
  return (dispatch) => {
    return callApi(`${api.server}/categories/${id}`, 'GET', null).then((res) => {
      if (res) {
        dispatch(actGetCategoryById(res.data));
      }
    });
  };
}

export const actGetCategoryById = (value) => {
  return {
    type: Types.EDIT_CATEGORIES,
    value,
  };
};

export function actUpdateCategoryRequest(value) {
  return (dispatch) => {
    return callApi(`${api.server}/categories/${value._id}`, 'PATCH', value).then((res) => {
      if (res) {
        manageAlert(Message.SUA_THANH_CONG);
        dispatch(actUpdateCategory(res.data));
      }
    });
  };
}

export const actUpdateCategory = (value) => {
  return {
    type: Types.UPDATE_CATEGORIES,
    value,
  };
};
