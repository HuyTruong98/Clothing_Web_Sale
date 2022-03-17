/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import * as actSearchTerm from '../../../redux/actions/manageSearchTerm/actManageSearchTerm';

function PostFilterForm({ onChange }) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const typingTimeoutRef = useRef(null);
  const statusSearch = useSelector((state) => state.manageSearchTerm.item);

  function setSearchKey(e) {
    const value = e.target.value;
    setSearchTerm(value);

    if (!onChange) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    dispatch(actSearchTerm.actSearchTermStatus({ status: false }));

    typingTimeoutRef.current = setTimeout(() => {
      const formValue = {
        searchTerm: value,
      };
      onChange(formValue);
    }, 400);
  }

  return (
    <>
      <Input
        size="large"
        placeholder="Tìm kiếm..."
        bordered
        suffix={<SearchOutlined />}
        value={statusSearch.status ? '' : searchTerm}
        onChange={setSearchKey}
        style={{ width: 230, marginTop: '5px', marginRight: '10px' }}
      />
    </>
  );
}

export default PostFilterForm;
