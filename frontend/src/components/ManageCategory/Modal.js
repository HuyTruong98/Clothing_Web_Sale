import React, { useEffect } from 'react';
import {
  Modal, Button,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormCategory from './Form';
import { useSelector } from 'react-redux';

function ModalFormCategory({ isVisible, handleCancel, onSave }) {
  const [form] = useForm();
  const initialValue = useSelector((state) => state.manageCategory.item);

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(initialValue);
  }, [isVisible, form, initialValue]);
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
        <FormCategory onSave={onSave} form={form} />
      </Modal>
    </>
  );
}

export default ModalFormCategory;
