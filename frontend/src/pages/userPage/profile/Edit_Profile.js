/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from 'react';
import { Avatar, Form, Modal, Upload, Button, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { PlusOutlined } from '@ant-design/icons';

function Edit_Profile({ isVisible, handleCancel, onSave, account_current }) {
  const [form] = useForm();
  const [file, setFile] = useState([]);
  function handleChange({ fileList }) {
    if (fileList.length === 0) {
      setFile([]);
      form.setFieldsValue({
        image: undefined,
      });
    } else {
      setFile(fileList);
    }
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload Avatar</div>
    </div>
  );

  useEffect(() => {
    setFile([]);
    form.setFieldsValue({
      image: undefined,
    });
    form.resetFields();
    form.setFieldsValue(account_current)
  }, [isVisible]);
  return (
    <>
      <Modal
        title="Chỉnh sửa thông tin"
        visible={isVisible}
        onCancel={handleCancel}
        footer={[
          <Button onClick={() => form.submit()}>OK</Button>,
          <Button
            onClick={() => {
              handleCancel();
            }}
          >
            Huỷ
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          form={form}
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
            label="Hình đại diện"
            name="image"
            rules={[{ required: true, message: 'Vui lòng chèn ảnh!' }]}
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
              maxCount={1}
              accept="image/png, image/gif, image/jpeg"
              onChange={handleChange}
            >
              {file.length === 0 ? uploadButton : null}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Edit_Profile;
