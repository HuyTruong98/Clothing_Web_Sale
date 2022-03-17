/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button, Modal } from 'antd';
import FormRegister from '../login/FormRegister';

function ModalFormRegister({ isVisible, handleCancel, onSave, form }) {
  useEffect(() => {
    form.resetFields();
  }, [isVisible, form]);
  return (
    <>
      <Modal
        title="Đăng ký tài khoản"
        visible={isVisible}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel}>Hủy</Button>,
          <Button onClick={() => form.submit()}>OK</Button>,
        ]}
      >
        <FormRegister onSave={onSave} form={form} />
      </Modal>
    </>
  );
}

export default ModalFormRegister;
