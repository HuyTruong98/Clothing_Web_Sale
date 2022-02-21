import * as Types from '../../../constants/ActionType';
import callApi, { callQueryString } from '../../../constants/api';
import * as api from '../../../constants/url';
import * as Message from '../../../constants/Message';
import { manageAlert } from '../../../constants/Alert';

export function actFetchColorsRequest() {
  return (dispatch) => {
    return callApi(`${api.server}/colors`, 'GET', null).then((res) => {
      if (res) {
        dispatch(actFetchColors(res.data))
      }
    });
  }
}

export const actFetchColors = (data) => {
  return {
    type: Types.FETCH_COLOR,
    data,
  };
};

export function actCreateColorRequest(value) {
  return (dispatch) => {
    return callApi(`${api.server}/colors`, 'POST', value).then((res) => {
      if (res) {
        manageAlert(Message.THEM_THANH_CONG);
        dispatch(actCreateColor(res.data));
      }
    });
  };
}

export const actCreateColor = (value) => {
  return {
    type: Types.CREATE_COLOR,
    value,
  };
};

export function actDeleteColorRequest(id) {
  return (dispatch) => {
    return callApi(`${api.server}/colors/${id}`, 'DELETE', null).then((res) => {
      if (res) {
        manageAlert(Message.XOA_THANH_CONG);
        dispatch(actDeleteColor(id));
      }
    });
  };
}

export const actDeleteColor = (id) => {
  return {
    type: Types.DELETE_COLOR,
    id,
  };
};

export function actGetColorByIdRequest(id) {
  return (dispatch) => {
    return callApi(`${api.server}/colors/${id}`, 'GET', null).then((res) => {
      if (res) {
        dispatch(actGetColorById(res.data));
      }
    });
  };
}

export const actGetColorById = (value) => {
  return {
    type: Types.EDIT_COLOR,
    value,
  };
};

export function actUpdateColorRequest(value) {
  return (dispatch) => {
    return callApi(`${api.server}/colors/${value._id}`, 'PATCH', value).then((res) => {
      if (res) {
        manageAlert(Message.SUA_THANH_CONG);
        dispatch(actUpdateColor(res.data));
      }
    });
  };
}

export const actUpdateColor = (value) => {
  return {
    type: Types.UPDATE_COLOR,
    value,
  };
};
