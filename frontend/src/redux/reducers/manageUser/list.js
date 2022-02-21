/* eslint-disable array-callback-return */
/* eslint-disable vars-on-top */
/* eslint-disable no-param-reassign */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
import * as Types from '../../../constants/ActionType';

var initialState = [];

const list = (state = initialState, action) => {
  var index = -1;
  var { id, value, data } = action;
  switch (action.type) {
    case Types.FETCH_USER:
      var newArr = [];
      if (data) {
        data.map((item) => {
          item = {
            ...item,
            key: item.id,
          };
          newArr.push(item);
        });
      }
      state = newArr;
      return [...state];
    default:
      return [...state];
  }
};

export default list;
