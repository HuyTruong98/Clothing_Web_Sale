/* eslint-disable no-unused-vars */
import * as Types from '../../../constants/ActionType';
import callApi, { callQueryString } from '../../../constants/api';
import * as api from '../../../constants/url';
import * as Message from '../../../constants/Message';
import { manageAlert } from '../../../constants/Alert';

export const getAllCart = (data) => {
  return {
    type: Types.FETCH_CART,
    data,
  };
};

export const deleteCart = (value) => {
  manageAlert(Message.XOA_SAN_PHAM_KHOI_GIO_HANG_THANH_CONG);
  return {
    type: Types.DELETE_CART,
    value,
  };
};

export const actCreateCart = (value) => {
  manageAlert(Message.THEM_VAO_GIO_HANG_THANH_CONG);
  return {
    type: Types.CREATE_CART,
    value,
  };
};

export const actUpdateCart = (value, quantily) => {
  return {
    type: Types.UPDATE_CART,
    value,
    quantily,
  };
};

export const resetCart = (value) => {
  manageAlert(Message.DAT_HANG_THANH_CONG);
  return {
    type: Types.REMOVE_ALL_CART,
    value
  };
};
