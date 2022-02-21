/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  Modal, Button,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormSlider from './Form';
import { useSelector } from 'react-redux';

function ModalSlider({ isVisible, handleCancel, onSave, file, setFile, getNameFile, setArrImgProductObject }) {
  const [form] = useForm();
  const initialValue = useSelector((state) => state.manageSliders.item);

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(initialValue);
    setArrImgProductObject(initialValue);
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
        <FormSlider
          onSave={onSave}
          form={form}
          file={file}
          setFile={setFile}
          initialValue={initialValue}
          getNameFile={getNameFile}
        />
      </Modal>
    </>
  );
}

export default ModalSlider;
