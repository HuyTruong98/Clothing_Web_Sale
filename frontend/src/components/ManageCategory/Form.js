import React from 'react';
import { Form, Input } from 'antd';

// eslint-disable-next-line react/prop-types
function FormCategory({ form, onSave }) {
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="basic"
        onFinish={onSave}
        initialValues={{ remember: true }}
      >

        <Form.Item
          label="Category"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên category!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );
}

export default FormCategory;
