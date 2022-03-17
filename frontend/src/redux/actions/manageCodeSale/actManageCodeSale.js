/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import * as Types from '../../../constants/ActionType';
import callApi, { callQueryString } from '../../../constants/api';
import * as api from '../../../constants/url';
import * as Message from '../../../constants/Message';
import { manageAlert } from '../../../constants/Alert';

export function actFetchCodeSaleRequest(filter, setListCodeSale) {
  return (dispatch) => {
    return callApi(callQueryString(`${api.server}/code-sale`, filter), 'GET', null).then((res) => {
      if (res) {
        setListCodeSale([...res.data.data]);
      };
    });
  }
}

export function actFetchPaginationCodeSaleRequest(filter, setPage) {
  return (dispatch) => {
    return callApi(callQueryString(`${api.server}/code-sale`, filter), 'GET', null).then((res) => {
      if (res) {
        setPage(res.data.total);
      };
    });
  }
}

export function actCreateCodeSaleRequest(value) {
  return (dispatch) => {
    return callApi(`${api.server}/code-sale`, 'POST', value).then((res) => {
      if (res) {
        manageAlert(Message.THEM_THANH_CONG);
      }
    });
  };
}

export function actGetcodeSaleByIdRequest(id, setInitialValue) {
  return (dispatch) => {
    return callApi(`${api.server}/code-sale/${id}`, 'GET', null).then((res) => {
      if (res) {
        setInitialValue(res.data);
      }
    });
  };
}

export function actUpdateCodeSaleRequest(id, value, setCodeSaleObject) {
  return (dispatch) => {
    return callApi(`${api.server}/code-sale/${id}`, 'PATCH', value).then((res) => {
      if (res) {
        manageAlert(Message.CAP_NHAT_KHO_THANH_CONG);
        setCodeSaleObject(res.data);
      }
    });
  };
}

export function actUpdateCodeSalePayMentRequest(id, value) {
  return (dispatch) => {
    return callApi(`${api.server}/code-sale/${id}`, 'PATCH', value).then((res) => {
      if (res) {
      }
    });
  };
}

export function actDeleteCodeSaleRequest(id) {
  return (dispatch) => {
    return callApi(`${api.server}/code-sale/${id}`, 'DELETE', null).then((res) => {
      if (res) {
        manageAlert(Message.XOA_THANH_CONG);
      }
    });
  };
}
