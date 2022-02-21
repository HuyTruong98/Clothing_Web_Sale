/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, Button } from 'antd';

function FormLogin({ onFinish }) {
  return (
    <>
      <div className="login-form-container">
        <Form
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
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

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập Password!' }
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              borderRadius: '15px', background: '#ffd6e7', border: 'none',
            }}
          >
            Đăng Nhập
          </Button>
        </Form>
      </div>
    </>
  );
}

export default FormLogin;
