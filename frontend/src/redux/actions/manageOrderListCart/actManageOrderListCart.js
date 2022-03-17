/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import * as Types from '../../../constants/ActionType';
import callApi, { callQueryString } from '../../../constants/api';
import * as api from '../../../constants/url';
import * as Message from '../../../constants/Message';
import { manageAlert } from '../../../constants/Alert';

export function actFetchOderCartRequest(setListOrder) {
  return (dispatch) => {
    return callApi(callQueryString(`${api.server}/oderCart`), 'GET', null).then((res) => {
      if (res) {
        setListOrder(res.data.data);
      };
    });
  }
}

export function actFetchOderCartCountRequest(setCount) {
  return (dispatch) => {
    return callApi(callQueryString(`${api.server}/oderCart`), 'GET', null).then((res) => {
      if (res) {
        setCount(res.data.total);
      };
    });
  }
}

export function actCreateOderCartRequest(value) {
  return (dispatch) => {
    return callApi(`${api.server}/oderCart`, 'POST', value).then((res) => {
      if (res) {
      }
    });
  };
}

export function actGetOrderCartByIdRequest(id, setInitialValue) {
  return (dispatch) => {
    return callApi(`${api.server}/oderCart/${id}`, 'GET', null).then((res) => {
      if (res) {
        setInitialValue(res.data);
      }
    });
  };
}

export function actUpdateOrderProductRequest(value, id, setInitialValue) {
  return (dispatch) => {
    return callApi(`${api.server}/oderCart/${id}`, 'PATCH', value).then((res) => {
      if (res) {
        manageAlert(Message.CAP_NHAT_KHO_THANH_CONG);
        setInitialValue(res.data);
      }
    });
  };
}

export function actDeleteOrderCartRequest(id) {
  return (dispatch) => {
    return callApi(`${api.server}/oderCart/${id}`, 'DELETE', null).then((res) => {
      if (res) {
        manageAlert(Message.XOA_THANH_CONG);
      }
    });
  };
}
