/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  Modal, Button,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useSelector } from 'react-redux';
import FormProducts from './Form';

function ModalProduct(
  { isVisible, handleCancel, onSave, listCategory, listColor,
    listType, file, setFile, getNameFile, setArrImgProductObject,
    arrImgProductObject, setCountDate, setBestSeller,
  }
) {
  const initialValues = useSelector((state) => state.manageProducts.item);
  const [form] = useForm();
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(initialValues);
  }, [isVisible, form, initialValues]);
  return (
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
      <FormProducts
        onSave={onSave}
        form={form}
        listType={listType}
        listCategory={listCategory}
        listColor={listColor}
        initialValues={initialValues}
        isVisible={isVisible}
        file={file}
        setFile={setFile}
        getNameFile={getNameFile}
        setArrImgProductObject={setArrImgProductObject}
        arrImgProductObject={arrImgProductObject}
        setCountDate={setCountDate}
        setBestSeller={setBestSeller}
      />
    </Modal>
  );
}

export default ModalProduct;
