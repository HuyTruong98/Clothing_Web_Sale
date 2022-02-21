/* eslint-disable array-callback-return */
/* eslint-disable vars-on-top */
/* eslint-disable no-param-reassign */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
import * as Types from '../../../constants/ActionType';

var initialState = [];

var findIndex = (data, id) => {
  var result = -1;
  data.forEach((data, index) => {
    if (data._id === id) {
      result = index;
    }
  });
  return result;
};

const list = (state = initialState, action) => {
  var index = -1;
  var { id, value, data } = action;
  switch (action.type) {
    case Types.FETCH_CATEGORIES:
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
    case Types.CREATE_CATEGORIES:
      state.push(action.value);
      return [...state];
    case Types.DELETE_CATEGORIES:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    case Types.UPDATE_CATEGORIES:
      index = findIndex(state, value._id);
      state[index] = value;
      return [...state];
    default:
      return [...state];
  }
};

export default list;
