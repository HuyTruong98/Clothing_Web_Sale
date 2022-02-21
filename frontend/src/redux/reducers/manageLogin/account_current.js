import * as Types from '../../../constants/ActionType';
var initialState = {};

const item = (state = initialState, action) => {
  var { value } = action;
  switch (action.type) {
    case Types.LOGIN_SUCCESS:
      return value;
    default:
      return state;
  }
};

export default item;
