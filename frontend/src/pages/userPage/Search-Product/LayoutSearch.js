/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory } from 'react-router-dom';
import PostFilterForm from './PostFilterForm';
import * as URL from '../../../constants/url';
import { removeVietnameseTones } from '../../../constants/renderConvert';

function LayoutSearch({ valueSearch, setValueSearch }) {
  const history = useHistory();

  const handleOnchange = (newFilter) => {
    if (newFilter.searchTerm.length > 0 && newFilter.searchTerm.length < 3 || newFilter.searchTerm.length === 0) {
      return;
    } else {
      history.push({
        pathname: URL.SEARCH_PRODUCT,
        search: `?search_query=${removeVietnameseTones(newFilter.searchTerm)}`,
        state: newFilter.searchTerm,
      });
    }
  };

  return (
    <>
      <PostFilterForm
        onChange={handleOnchange}
        valueSearch={valueSearch}
        setValueSearch={setValueSearch}
      />
    </>
  );
}

export default LayoutSearch;
