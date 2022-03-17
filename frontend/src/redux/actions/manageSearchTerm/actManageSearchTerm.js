import * as Types from '../../../constants/ActionType';

export const actSearchTermStatus = (value) => {
  return {
    type: Types.SEARCH_TERM,
    value,
  };
};
