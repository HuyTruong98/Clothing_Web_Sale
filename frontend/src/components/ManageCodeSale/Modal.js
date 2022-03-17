/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  Modal, Button,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormCodeSale from './Form';

function ModalCodeSale({ isVisible, handleCancel, onSave, initialValue }) {
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    form.resetFields();
  }, [isVisible, form]);
  return (
    <>
      <Modal
        title="Thêm mới"
        visible={isVisible}
        onCancel={handleCancel}
        width={1000}
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
        <FormCodeSale onSave={onSave} form={form} />
      </Modal>
    </>
  );
}

export default ModalCodeSale;
