/* eslint-disable no-unused-vars */
import * as Types from '../../../constants/ActionType';
import callApi, { callQueryString } from '../../../constants/api';
import * as api from '../../../constants/url';
import * as Message from '../../../constants/Message';
import { manageAlert } from '../../../constants/Alert';

export function actFetchSlidersRequest(filter) {
  return (dispatch) => {
    return callApi(`${api.server}/sliders`, 'GET', null).then((res) => {
      if (res) {
        dispatch(actFetchSliders(res.data))
      }
    });
  }
}

export const actFetchSliders = (data) => {
  return {
    type: Types.FETCH_SLIDERS,
    data,
  };
};

export function actCreateSlidersRequest(value) {
  return (dispatch) => {
    return callApi(`${api.server}/sliders`, 'POST', value).then((res) => {
      if (res) {
        manageAlert(Message.THEM_THANH_CONG);
        dispatch(actCreateSliders(res.data));
      }
    });
  };
}

export const actCreateSliders = (value) => {
  return {
    type: Types.CREATE_SLIDERS,
    value,
  };
};

export function actDeleteSliderRequest(id) {
  return (dispatch) => {
    return callApi(`${api.server}/sliders/${id}`, 'DELETE', null).then((res) => {
      if (res) {
        manageAlert(Message.XOA_THANH_CONG);
        dispatch(actDeleteSlider(id));
      }
    });
  };
}

export const actDeleteSlider = (id) => {
  return {
    type: Types.DELETE_SLIDERS,
    id,
  };
};

export function actGetSliderByIdRequest(id) {
  return (dispatch) => {
    return callApi(`${api.server}/sliders/${id}`, 'GET', null).then((res) => {
      if (res) {
        dispatch(actGetSliderById(res.data))
      }
    })
  }
}

export const actGetSliderById = (value) => {
  return {
    type: Types.EDIT_SLIDERS,
    value,
  };
};

export function actUpdateSliderRequest(value, id) {
  return (dispatch) => {
    return callApi(`${api.server}/sliders/${id}`, 'PATCH', value).then((res) => {
      if (res) {
        manageAlert(Message.SUA_THANH_CONG);
        dispatch(actUpdateSlider(res.data));
      }
    });
  };
}

export const actUpdateSlider = (value) => {
  return {
    type: Types.UPDATE_SLIDERS,
    value,
  };
};
