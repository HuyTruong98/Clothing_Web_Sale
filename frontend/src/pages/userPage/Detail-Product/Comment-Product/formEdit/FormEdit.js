import React from 'react';
import { Rate, Form, Input } from 'antd';

const { TextArea } = Input;
function FormEdit({ form, onSave }) {
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
      </Form>
    </>
  );
}

export default FormEdit;
