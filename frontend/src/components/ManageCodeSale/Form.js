import React from 'react';
import { Form, Input, InputNumber } from 'antd';

function FormCodeSale({ form, onSave }) {
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
          label="Mã code sale"
          name="code"
          rules={[{ required: true, message: 'Vui lòng nhập tên code!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[
            { type: 'number', required: true, message: 'Vui lòng nhập số tiền!' },
          ]}
        >
          <InputNumber
            min={1000}
            max={1000000000}
            style={{ width: '100%' }}
            formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          label="Số lần sử dụng"
          name="quantily"
          rules={[{ required: true, message: 'Vui lòng nhập số lần!' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Form.Item>
      </Form>
    </>
  );
}

export default FormCodeSale;
