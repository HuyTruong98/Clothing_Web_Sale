/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import {
  Form, Input, Select, InputNumber, Upload, Button, Space, Image, Descriptions, Badge, Popconfirm,
} from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import FileEdit from './FileEdit';

const { TextArea } = Input;
const { Option } = Select;
function FormProducts(
  { onSave, form, listType, listCategory, initialValues, setCountDate, setBestSeller,
    file, setFile, getNameFile, setArrImgProductObject, arrImgProductObject, listColor,
  }) {
  const [dataSupCategory, setDataSupCategorye] = useState([]);
  const changeTypeTheoCategory = async (value) => {
    if (value === '') {
      setDataSupCategorye([]);
      form.setFieldsValue({
        typeProductId: undefined,
      });
    } else {
      const listSubCategory = listType.filter((item) => (item.categoryId === value));
      setDataSupCategorye(listSubCategory);
      form.setFieldsValue({
        typeProductId: undefined,
      });
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload Slide</div>
    </div>
  );

  function handleChange({ fileList }) {
    if (fileList.length === 0) {
      setFile([]);
      form.setFieldsValue({
        imgUrl: undefined,
      });
    } else {
      setFile(fileList);
    }
  }

  useEffect(() => {
    const listSubCategory = listType.filter((item) => (item.categoryId === initialValues?.categoryId));
    setDataSupCategorye(listSubCategory);
    setArrImgProductObject(initialValues && initialValues.imgProduct && initialValues.imgProduct);

  }, [initialValues]);

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="basic"
        onFinish={onSave}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Tên sản phẩm"
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
        {
          !initialValues
            ? (
              ''
            )
            : (
              <>
                <Form.Item
                  label="Mã sản phẩm"
                  name="productCode"
                  rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm!' }]}
                >
                  <Input defaultValue={initialValues.productCode} disabled />
                </Form.Item>
              </>
            )
        }
        <Form.Item
          label="Loại sản phẩm"
          name="categoryId"
          rules={[{ required: true, message: 'Vui lòng chọn!' }]}
        >
          <Select
            showSearch
            style={{ width: '100%' }}
            defaultValue="-- Vui lòng chọn --"
            onChange={changeTypeTheoCategory}
          >
            <Option value="">Tất cả</Option>
            {listCategory.map((item, index) => {
              if (item) {
                return (
                  <>
                    <Option key={index} value={item._id}>{item.name}</Option>
                  </>
                );
              }
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Danh mục"
          name="typeProductId"
          rules={[{ required: true, message: 'Vui lòng chọn!' }]}
        >

          {dataSupCategory && (
            <Select
              defaultValue="-- Vui lòng chọn --"
              style={{ width: '100%' }}
              placeholder="-- Vui lòng chọn --"
            >
              {dataSupCategory.map((item, index) => <Option key={index} value={item._id}>{item.name}</Option>)}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label="Giá"
          name="price"
          rules={[
            { type: 'number', required: true, message: 'Vui lòng nhập số tiền!' },
          ]}
        >
          <InputNumber
            min={1000}
            max={1000000000}
            style={{ width: '100%' }}
            formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>
        <Form.Item
          label="Giá sale"
          name="priceSale"
          rules={[
            { type: 'number', required: true, message: 'Nếu không sale nhập 0đ!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('price') > value) {
                  return Promise.resolve();
                }
                return Promise.reject('Giá sale phải nhỏ hơn giá gốc!');
              },
            }),
          ]}
          initialValue={0}
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.List
          name="sizeAndColorAndNumber"
          initialValue={[{ size: 'S', howNumber: '10' }]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    label="Size"
                    name={[name, 'size']}
                    fieldKey={[fieldKey, 'size']}
                    rules={[{ required: true, message: 'Vui lòng nhập size!' }]}
                  >
                    <Input placeholder="Size" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Màu sắc"
                    name={[name, 'colorProductId']}
                    fieldKey={[fieldKey, 'colorProductId']}
                    rules={[{ required: true, message: 'Vui lòng nhập màu sắc!' }]}
                  >
                    <Select style={{ width: 160 }}>
                      {
                        listColor.map((itemColor, indexColor) => {
                          return (
                            <>
                              <Option key={indexColor} value={itemColor._id}>{itemColor.name}</Option>
                            </>
                          );
                        })
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Số lượng"
                    name={[name, 'howNumber']}
                    fieldKey={[fieldKey, 'howNumber']}
                    rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                  >
                    <Input placeholder="Số lượng" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm Size - Màu sắc - Số lượng
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mô tả!',
            },
            {
              whitespace: true,
              message: 'Vui lòng không nhập khoảng trống!',
            },
            {
              min: 10,
              message: 'Tối thiểu 10 ký tự!',
            },
          ]}
          hasFeedback
        >
          <TextArea rows={5} />
        </Form.Item>
        {
          !initialValues
            ?
            <Form.Item
              label="Hình đại diện"
              name="imgUrl"
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
            :
            <FileEdit
              initialValues={initialValues}
              setFile={setFile}
              file={file}
              getNameFile={getNameFile}
              setArrImgProductObject={setArrImgProductObject}
              arrImgProductObject={arrImgProductObject}
              setCountDate={setCountDate}
              setBestSeller={setBestSeller}
            />
        }
      </Form>
    </>
  );
}

export default FormProducts;
