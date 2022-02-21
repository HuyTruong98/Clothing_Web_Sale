/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import * as Types from '../../../constants/ActionType';
import callApi, { callQueryString } from '../../../constants/api';
import * as api from '../../../constants/url';
import * as Message from '../../../constants/Message';
import { manageAlert } from '../../../constants/Alert';

export function actFetchProductsRequest(filter) {
  return (dispatch) => {
    return callApi(callQueryString(`${api.server}/products`, filter), 'GET', null).then((res) => {
      if (res) {
        dispatch(actFetchProducts(res.data.data));
      };
    });
  }
}

export const actFetchProducts = (data) => {
  return {
    type: Types.FETCH_PRODUCTS,
    data,
  };
};

export function actFetchPaginationProductRequest() {
  return (dispatch) => {
    return callApi(`${api.server}/products`, 'GET', null).then((res) => {
      if (res) {
        dispatch(actFetchPaginationProduct(res.data.total))
      }
    });
  }
}

export const actFetchPaginationProduct = (data) => {
  return {
    type: Types.FETCH_PAGINATION,
    data,
  };
};


export function actCreateProductRequest(value) {
  return (dispatch) => {
    return callApi(`${api.server}/products`, 'POST', value).then((res) => {
      if (res) {
        manageAlert(Message.THEM_THANH_CONG);
        dispatch(actCreateProduct(res.data));
      }
    });
  };
}

export const actCreateProduct = (value) => {
  return {
    type: Types.CREATE_PRODUCTS,
    value,
  };
};

export function actGetProductByIdRequest(id) {
  return (dispatch) => {
    return callApi(`${api.server}/products/${id}`, 'GET', null).then((res) => {
      if (res) {
        dispatch(actGetProductById(res.data));
      }
    });
  };
}

export const actGetProductById = (value) => {
  return {
    type: Types.EDIT_PRODUCTS,
    value,
  };
};

export function actDeleteProductRequest(id) {
  return (dispatch) => {
    return callApi(`${api.server}/products/${id}`, 'DELETE', null).then((res) => {
      if (res) {
        manageAlert(Message.XOA_THANH_CONG);
        dispatch(actDeleteProduct(id));
      }
    });
  };
}

export const actDeleteProduct = (id) => {
  return {
    type: Types.DELETE_PRODUCTS,
    id,
  };
};

export function actUpdateProductRequest(value, id) {
  return (dispatch) => {
    return callApi(`${api.server}/products/${id}`, 'PATCH', value).then((res) => {
      if (res) {
        manageAlert(Message.SUA_THANH_CONG);
        dispatch(actUpdateProduct(res.data));
      }
    });
  };
}

export const actUpdateProduct = (value) => {
  return {
    type: Types.UPDATE_PRODUCTS,
    value,
  };
};
