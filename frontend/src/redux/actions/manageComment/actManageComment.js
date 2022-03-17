import * as Types from '../../../constants/ActionType';
import callApi, { callQueryString } from '../../../constants/api';
import * as api from '../../../constants/url';
import * as Message from '../../../constants/Message';
import { manageAlert } from '../../../constants/Alert';

export function actFetchCommentRequest(filter, setListComments) {
  return (dispatch) => {
    return callApi(callQueryString(`${api.server}/comment`, filter), 'GET', null).then((res) => {
      if (res) {
        setListComments([...res.data.data]);
      };
    });
  }
}

export function actFetchPaginationCommentRequest(filter, setPagi) {
  return (dispatch) => {
    return callApi(callQueryString(`${api.server}/comment`, filter), 'GET', null).then((res) => {
      if (res) {
        setPagi(res.data.total);
      };
    });
  }
}

export function actCreateCommentRequest(value) {
  return (dispatch) => {
    return callApi(`${api.server}/comment`, 'POST', value).then((res) => {
      if (res) {
        manageAlert(Message.THEM_THANH_CONG);
      }
    });
  };
}

export function actGetCommentByIdRequest(id, setInitialValue) {
  return (dispatch) => {
    return callApi(`${api.server}/comment/${id}`, 'GET', null).then((res) => {
      if (res) {
        setInitialValue(res.data);
      }
    });
  };
}

export function actUpdateCommentRequest(value, id, setCommentObject) {
  return (dispatch) => {
    return callApi(`${api.server}/comment/${id}`, 'PATCH', value).then((res) => {
      if (res) {
        manageAlert(Message.SUA_THANH_CONG);
        setCommentObject(res.data);
      }
    });
  };
}

export function actDeleteCommentRequest(id) {
  return (dispatch) => {
    return callApi(`${api.server}/comment/${id}`, 'DELETE', null).then((res) => {
      if (res) {
        manageAlert(Message.XOA_THANH_CONG);
      }
    });
  };
}
