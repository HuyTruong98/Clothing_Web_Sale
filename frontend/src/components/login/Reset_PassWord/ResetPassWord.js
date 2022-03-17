/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { manageAlertError } from '../../../constants/Alert';
import * as Message from '../../../constants/Message';
import * as URL from '../../../constants/url';

function ResetPassWord({ location }) {
  const token = location.pathname.slice(22);
  const history = useHistory();
  const [form] = useForm();

  const onFinish = (value) => {
    const newValue = {
      password: value.password,
    };
    console.log(newValue);
  };

  useEffect(() => {
    manageAlertError(Message.PHIEN_BAN_HET_HAN_10);
    setTimeout(() => {
      history.push(URL.HOME);
    }, 60000);
  }, []);
  return (
    <>
      <div className="breadcrumb_background">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 a-left">
              <p><Link style={{ color: 'white' }} to={URL.HOME} className="my-link hover-link">Đăng nhập</Link> &ensp;  <i className="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Thay đổi mật khẩu</span></p>
            </div>
          </div>
        </div>
      </div>
      <div className="breadcrumb-product-detail">
        {
          token
            ?
            <div className="container">
              <div className="row">
                <div className="change-password">
                  <div className="change-pass-with-1"></div>
                  <div className="change-pass-with-2">
                    <Form
                      form={form}
                      layout="vertical"
                      name="basic"
                      onFinish={onFinish}
                      initialValues={{ remember: true }}
                    >

                      <Form.Item
                        label="Mật khẩu mới"
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
                        label="Xác nhận mật khẩu"
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

                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        style={{
                          borderRadius: '15px', background: '#ffd6e7', border: 'none',
                        }}
                      >
                        Đặt lại
                      </Button>
                    </Form>
                  </div>
                  <div className="change-pass-with-1"></div>
                </div>
              </div>
            </div>
            :
            ''
        }
      </div>
    </>
  );
}

export default ResetPassWord;
