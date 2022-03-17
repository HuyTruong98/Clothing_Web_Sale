/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Button, Modal, Spin } from 'antd';
import FormResetPass from '../login/Reset_PassWord/FormResetPass';

function ModalForgetPass({ isVisible, handleCancel, onForget, form, time }) {
  useEffect(() => {
    form.resetFields();
  }, [isVisible, form]);
  return (
    <>
      <Modal
        title="Nhập email để lấy lại mật khẩu"
        visible={isVisible}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel}>Hủy</Button>,
          <Button onClick={() => form.submit()}>OK</Button>,
        ]}
      >
        <Spin
          tip={`Đang gửi`}
          size="large"
          spinning={time}
        >
          <FormResetPass onForget={onForget} form={form} />
        </Spin>
      </Modal>
    </>
  );
}

export default ModalForgetPass;
