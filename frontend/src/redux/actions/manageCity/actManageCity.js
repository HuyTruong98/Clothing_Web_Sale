import * as Types from '../../../constants/ActionType';
import callApi, { callQueryString } from '../../../constants/http-city';
import * as api from '../../../constants/url';
import * as Message from '../../../constants/Message';
import { manageAlert } from '../../../constants/Alert';

export function actFetchCityRequest(setCity) {
  return (dispatch) => {
    return callApi((`https://online-gateway.ghn.vn/shiip/public-api/master-data/province`), 'GET', null).then((res) => {
      if (res) {
        setCity([...res.data.data]);
      }
    });
  }
};

export function actFetchDistrictRequest(value, setDistrict) {
  return (dispatch) => {
    return callApi(callQueryString(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district`, value), 'GET', null).then((res) => {
      if (res) {
        setDistrict([...res.data.data]);
      }
    });
  }
};

export function actFetchWardRequest(value, setWard) {
  return (dispatch) => {
    return callApi(callQueryString(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`, value), 'GET', null).then((res) => {
      if (res) {
        setWard([...res.data.data]);
      }
    });
  }
};

export function actDeliveryMethodRequest(methodAll, setMethodDelivery) {
  return (dispatch) => {
    return callApi(callQueryString(`https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services`, methodAll), 'GET', null).then((res) => {
      setMethodDelivery(res.data.data);
      manageAlert(res.data.code_message_value);
    })
  }
};

export function actPriceTransportFeeRequest(value, setPriceTransportFee) {
  return (dispatch) => {
    return callApi(callQueryString(`https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`, value), 'GET', null).then((res) => {
      setPriceTransportFee(res.data.data);
    })
  }
};
