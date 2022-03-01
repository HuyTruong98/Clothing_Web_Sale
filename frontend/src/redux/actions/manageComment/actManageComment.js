import * as Types from '../../../constants/ActionType';
import callApi, { callQueryString } from '../../../constants/api';
import * as api from '../../../constants/url';
import * as Message from '../../../constants/Message';
import { manageAlert } from '../../../constants/Alert';

export function actFetchCommentRequest(setListComments) {
  return (dispatch) => {
    return callApi((`${api.server}/comment`), 'GET', null).then((res) => {
      if (res) {
        setListComments([...res.data]);
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
