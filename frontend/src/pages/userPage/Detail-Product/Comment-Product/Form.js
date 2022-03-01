import React from 'react';
import { Rate, Form, Button, Input } from 'antd';
import * as Message from '../../../../constants/Message';
import { manageAlert } from '../../../../constants/Alert';

const { TextArea } = Input;
function FormComment({ form, onSave, account_current }) {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  function onReport() {
    manageAlert(Message.MOI_BAN_DANG_NHAP_DE_COMMENT);
  }
  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        name="basic"
        onFinish={onSave}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="comment"
          rules={[{ required: true, message: "Vui lòng nhập phản hồi!" }]}

        >
          <TextArea placeholder="Phản hồi tại đây..." rows={3} />
        </Form.Item>
        <Form.Item
          name="rate"
          rules={[{ required: true, message: "Vui lòng chọn sao!" }]}
        >
          <Rate allowHalf />
        </Form.Item>
        {account_current.status === true ?
          <>
            <Button
              htmlType="submit"
              style={{ backgroundColor: '#ffac4b', height: '40px', border: 'none' }}
            >
              <strong>Đánh giá</strong>
            </Button>
          </>
          :
          <Button
            style={{ backgroundColor: '#ffac4b', height: '40px', border: 'none' }}
            onClick={() => onReport()}>
            <strong>Đánh giá</strong>
          </Button>
        }
      </Form>
    </>
  );
}

export default FormComment;
