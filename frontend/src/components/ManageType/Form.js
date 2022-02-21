/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, Select } from 'antd';

const { Option } = Select;
function FormType({ listCategory, form, onSave }) {
  const changeCategory = async (value) => {
    if (value) {
      form.setFieldsValue({
        name: undefined,
      });
    }
  };

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
          name="categoryId"
          rules={[{ required: true, message: 'Vui lòng chọn Category!' }]}
        >
          <Select
            defaultValue="-- Vui lòng chọn Category --"
            style={{ width: '100%' }}
            onChange={changeCategory}
          >
            {listCategory.map((item, index) => {
              if (item) {
                return (
                  <>
                    <Option key={index} value={item._id}>{item.name}</Option>
                  </>
                );
              }
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Type"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên Type!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );
}

export default FormType;
