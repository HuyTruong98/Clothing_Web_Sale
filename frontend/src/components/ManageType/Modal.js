import React, { useEffect } from 'react';
import {
  Modal, Button,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useSelector } from 'react-redux';
import FormType from './Form';

function ModalFormType({ isVisible, handleCancel, onSave, listCategory }) {
  const initialValue = useSelector((state) => state.manageTypes.item);
  const [form] = useForm();

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
        <FormType form={form} onSave={onSave} listCategory={listCategory} />
      </Modal>
    </>
  );
}

export default ModalFormType;