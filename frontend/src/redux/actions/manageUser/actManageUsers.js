/* eslint-disable no-unused-vars */
import * as Types from '../../../constants/ActionType';
import callApi from '../../../constants/api';
import * as api from '../../../constants/url';
import * as Message from '../../../constants/Message';
import { manageAlert } from '../../../constants/Alert';

export function actFetchUserRequest() {
  return (dispatch) => {
    return callApi(`${api.server}/users`, 'GET', null).then((res) => {
      if (res) {
        dispatch(actFetchUser(res.data))
      }
    });
  }
}

export const actFetchUser = (data) => {
  return {
    type: Types.FETCH_USER,
    data,
  };
};

export function actLogin(value, setLoginSuccess) {
  return (dispatch) => {
    return callApi(`${api.login}`, 'POST', value).then((res) => {
      if (res) {
        if (res.data.tokens.access) {
          let token = {
            id: res.data.user.id,
            token: res.data.tokens.refresh.token,
          };
          localStorage.setItem('token', JSON.stringify(token));
        }
        manageAlert(Message.DANG_NHAP_THANH_CONG);
        let data = {
          ...res.data,
          status: true,
        }
        setLoginSuccess(data);
      } else {
        manageAlert(Message.DANG_NHAP_THAT_BAI);
      }
    });
  }
}

export function actGetTaiKhoanByIdInApplicationRequest(id) {
  return (dispatch) => {
    return callApi(`${api.getUser}/${id}`, "GET", null).then((res) => {
      if (res) {
        let data = {
          ...res.data,
          status: true,
        };
        dispatch(actLoginUserSuccess(data));
      }
    });
  };
}

export function actCreateUserRequest(value) {
  return (dispatch) => {
    return callApi(`${api.register}`, 'POST', value).then((res) => {
      if (res) {
        manageAlert(Message.DANG_KI_THANH_CONG);
      }
    });
  };
}

export function actUpdateUserRequest(id, value) {
  return (dispatch) => {
    return callApi(`${api.getUser}/${id}`, 'PATCH', value).then((res) => {
      if (res) {
        manageAlert(Message.SUA_THANH_CONG);
        let data = {
          ...res.data,
          status: true,
        };
        dispatch(actLoginUserSuccess(data));
      }
    });
  };
}

export function actForgetPassUserRequest(value) {
  return (dispatch) => {
    return callApi(`${api.FORGET_PASSWORD}`, 'POST', value).then((res) => {
      if (res) {
        manageAlert(Message.MOI_BAN_CHECK_EMAIL);
      }
    });
  };
}

export function actLogOutUserRequest(value) {
  return (dispatch) => {
    return callApi(`${api.logout}`, 'POST', value).then((res) => {
      if (res) {
      }
    });
  };
}

export const actLoginUserSuccess = (value) => {
  return {
    type: Types.LOGIN_SUCCESS,
    value,
  };
};

export const actLogOut = (value) => {
  return {
    type: Types.LOGIN_SUCCESS,
    value,
  };
};