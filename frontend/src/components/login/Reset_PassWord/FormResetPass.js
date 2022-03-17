/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Form, Input } from 'antd';

function FormResetPass({ onForget, form }) {
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="basic"
        onFinish={onForget}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Email"
          name="email"
          validateFirst
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập email!',
            },
            {
              type: 'email',
              message: 'Email không đúng định dạng!',
            },
            {
              whitespace: true,
              message: 'Vui lòng không nhập khoảng trống'
            },
          ]}
        >
          <Input size="large" placeholder="@gmail.com" />
        </Form.Item>
      </Form>
    </>
  );
}

export default FormResetPass;
