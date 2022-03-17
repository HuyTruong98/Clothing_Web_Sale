import React, { useEffect } from 'react';
import {
  Modal, Button,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormEdit from './FormEdit';

function ModalEdit({ isVisible, handleCancel, onSave, initialValue }) {
  const [form] = useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(initialValue);
  }, [isVisible, form, initialValue]);
  return (
    <>
      <Modal
        title={`Sửa comment của ${initialValue && initialValue.account_name}`}
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
        <FormEdit form={form} onSave={onSave} />
      </Modal>
    </>
  );
}

export default ModalEdit;
