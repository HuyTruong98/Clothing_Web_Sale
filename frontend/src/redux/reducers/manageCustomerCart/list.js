/* eslint-disable array-callback-return */
/* eslint-disable vars-on-top */
/* eslint-disable no-param-reassign */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */

import * as Types from '../../../constants/ActionType';
var data = JSON.parse(localStorage.getItem('CART'));
var initialState = data ? data : [];

var findIndex = (data, value) => {
  var index = -1;
  if (data.length > 0) {
    for (var i = 0; i < data.length; i++) {
      if (data[i]._id === value._id && data[i].size === value.size && data[i].colorProductId === value.colorProductId) {
        index = i;
        break;
      }
    }
  }
  return index;
};

const list = (state = initialState, action) => {
  var index = -1;
  var { value, quantily } = action;
  switch (action.type) {
    case Types.CREATE_CART:
      index = findIndex(state, value);
      if (index !== -1) {
        state[index].quantily = state[index].quantily + value.quantily;
      } else {
        state.push(action.value);
      }
      localStorage.setItem('CART', JSON.stringify(state));
      return [...state];
    case Types.DELETE_CART:
      index = findIndex(state, value);
      if (index !== -1) {
        state.splice(index, 1);
      }
      localStorage.setItem('CART', JSON.stringify(state));
      return [...state];
    case Types.UPDATE_CART:
      index = findIndex(state, value, quantily);
      if (index !== -1) {
        state[index].quantily = quantily;
      }
      localStorage.setItem('CART', JSON.stringify(state));
      return [...state];
    case Types.REMOVE_ALL_CART:
      localStorage.removeItem('CART');
      localStorage.setItem('CART', JSON.stringify(value));
      return [...value];
    default:
      return [...state];
  }
};

export default list;
