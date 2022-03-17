/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import FormComment from './Form';
import { useForm } from "antd/lib/form/Form";
import { useDispatch, useSelector } from 'react-redux';
import * as actComment from '../../../../redux/actions/manageComment/actManageComment';
import ListComment from './List';
import { Button, Pagination, Row } from 'antd';
import ModalEdit from './formEdit/ModalEdit';

function CommentProduct({ productId }) {
  const [form] = useForm();
  const dispatch = useDispatch();
  const [listComments, setListComments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [initialValue, setInitialValue] = useState({});
  const [commentObject, setCommentObject] = useState({});
  const account_current = useSelector((state) => state.manageLogin.account_current);
  const [page, setPage] = useState();
  const [filter, setFilter] = useState({
    limit: 4,
    page: 1,
    productId: productId._id,
  });

  function onSave(value) {
    if (currentId) {
      const account = account_current.user ? account_current.user : account_current;
      const newValue = {
        ...value, _id: currentId,
        accountId: account.id,
        account_name: account.name,
        productId: productId._id,
      }
      dispatch(actComment.actUpdateCommentRequest(newValue, currentId, setCommentObject));
    } else {
      const account = account_current.user ? account_current.user : account_current;
      const newValue = {
        ...value,
        accountId: account.id,
        account_name: account.name,
        productId: productId._id,
      }
      dispatch(actComment.actCreateCommentRequest(newValue));
      form.setFieldsValue({
        comment: undefined,
        rate: undefined,
      });
      setFilter((filter) => ({ ...filter, page: 1 }));
    }
    cancel();
  }

  function onEdit(id) {
    setCurrentId(id);
    setOpenModal(true);
    dispatch(actComment.actGetCommentByIdRequest(id, setInitialValue));
  }

  function cancel() {
    setOpenModal(false);
    setInitialValue(null);
    setCurrentId(null);
  }

  function onDelete(id) {
    dispatch(actComment.actDeleteCommentRequest(id));
    const index = listComments.findIndex((x) => x._id === id);
    const newArrList = [...listComments];
    newArrList.splice(index, 1);
    setListComments([...newArrList]);
  }

  function handleChangePagination(page, pageSize) {
    setFilter((prevFilter) => ({ ...prevFilter, page: page }));
  }

  useEffect(() => {
    const index = listComments.findIndex((x) => x._id === commentObject._id);
    const newArrList = [...listComments];
    newArrList[index] = commentObject;
    setListComments(newArrList);
  }, [commentObject]);

  useEffect(() => {
    form.resetFields();
  }, [form, dispatch, onSave]);

  useEffect(() => {
    dispatch(actComment.actFetchCommentRequest(filter, setListComments));
    dispatch(actComment.actFetchPaginationCommentRequest(filter, setPage));
  }, [filter]);
  return (
    <>
      <FormComment form={form} onSave={onSave} account_current={account_current} />
      <ListComment
        listComments={listComments}
        account_current={account_current}
        productId={productId}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <ModalEdit
        isVisible={openModal}
        handleCancel={() => cancel()}
        onSave={onSave}
        initialValue={initialValue}
      />
      <Row justify="center">
        <Pagination
          total={page}
          pageSize={filter.limit}
          current={filter.page}
          onChange={(page, pageSize) => handleChangePagination(page, pageSize)}
        />
      </Row>
    </>
  );
}

export default CommentProduct;
