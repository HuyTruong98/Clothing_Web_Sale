/* eslint-disable no-useless-escape */
import React from 'react';
import { Form, Input } from 'antd';

export default function FormRegister({ onSave, form }) {
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="basic"
        onFinish={onSave}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Tên"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên sản phẩm!',
            },
            {
              whitespace: true,
              message: 'Vui lòng không nhập khoảng trống!',
            },
            {
              min: 3,
              message: 'Tối thiểu 3 ký tự!',
            },
            {
              max: 30,
              message: 'Tối đa 30 ký tự!',
            },
          ]}
          hasFeedback
        >

          <Input />
        </Form.Item>
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
            {
              max: 30,
              message: 'Tối đa 30 ký tự!',
            },
          ]}
          hasFeedback
        >
          <Input size="large" placeholder="@gmail.com" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { min: 8, message: 'Password cần dài ít nhất 8 ký tự!' },
            { required: true, message: 'Vui lòng nhập Password!' },
            {
              required: true,
              pattern: new RegExp('(?=.*[0-9])'),
              message: 'Password cần ít nhất 1 chữ số!'
            }
          ]}
          hasFeedback
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          label="Nhập lại mật khẩu"
          name="confirmPass"
          rules={[
            { required: true, message: 'Vui lòng xác nhận Password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Mật khẩu không khớp!');
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password size="large" />
        </Form.Item>

      </Form>
    </>
  );
}
