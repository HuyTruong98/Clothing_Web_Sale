/* eslint-disable array-callback-return */
/* eslint-disable vars-on-top */
/* eslint-disable no-param-reassign */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
import * as Types from '../../../constants/ActionType';

var initialState = {};

const item = (state = initialState, action) => {
  var { data } = action;
  switch (action.type) {
    case Types.FETCH_PAGINATION:
      return data;
    default:
      return state;
  }
};

export default item;
