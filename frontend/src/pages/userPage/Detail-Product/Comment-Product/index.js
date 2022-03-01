/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import FormComment from './Form';
import { useForm } from "antd/lib/form/Form";
import { useDispatch, useSelector } from 'react-redux';
import * as actComment from '../../../../redux/actions/manageComment/actManageComment';
import ListComment from './List';
import { Button, Row } from 'antd';

function CommentProduct({ productId }) {
  const [form] = useForm();
  const dispatch = useDispatch();
  const [listComments, setListComments] = useState([]);
  const [lengthRender, setLengthRender] = useState(4);
  const account_current = useSelector((state) => state.manageLogin.account_current);

  function handleShowMore() {
    setLengthRender(lengthRender + 4);
  }

  function onSave(value) {
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
    dispatch(actComment.actFetchCommentRequest(setListComments));
  }

  useEffect(() => {
    form.resetFields();
  }, [form, dispatch, onSave]);

  useEffect(() => {
    dispatch(actComment.actFetchCommentRequest(setListComments));
  }, []);
  return (
    <>
      <FormComment form={form} onSave={onSave} account_current={account_current} />
      <ListComment
        listComments={listComments}
        account_current={account_current}
        productId={productId}
        lengthRender={lengthRender}
      />
      <Row justify="center">
        {
          lengthRender > listComments.length
            ?
            <> </>
            :
            <Button
              style={{ backgroundColor: '#ffac4b', height: '40px', border: 'none', marginBottom: '30px' }}
              onClick={() => handleShowMore()}>
              <strong>Xem thêm đánh giá</strong>
            </Button>
        }
      </Row>
    </>
  );
}

export default CommentProduct;
