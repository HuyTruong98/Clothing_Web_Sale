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
          label="T??n s???n ph???m"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui l??ng nh???p t??n s???n ph???m!',
            },
            {
              whitespace: true,
              message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!',
            },
            {
              min: 3,
              message: 'T???i thi???u 3 k?? t???!',
            },
            {
              max: 30,
              message: 'T???i ??a 30 k?? t???!',
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
                  label="M?? s???n ph???m"
                  name="productCode"
                  rules={[{ required: true, message: 'Vui l??ng nh???p m?? s???n ph???m!' }]}
                >
                  <Input defaultValue={initialValues.productCode} disabled />
                </Form.Item>
              </>
            )
        }
        <Form.Item
          label="Lo???i s???n ph???m"
          name="categoryId"
          rules={[{ required: true, message: 'Vui l??ng ch???n!' }]}
        >
          <Select
            showSearch
            style={{ width: '100%' }}
            defaultValue="-- Vui l??ng ch???n --"
            onChange={changeTypeTheoCategory}
          >
            <Option value="">T???t c???</Option>
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
          label="Danh m???c"
          name="typeProductId"
          rules={[{ required: true, message: 'Vui l??ng ch???n!' }]}
        >

          {dataSupCategory && (
            <Select
              defaultValue="-- Vui l??ng ch???n --"
              style={{ width: '100%' }}
              placeholder="-- Vui l??ng ch???n --"
            >
              {dataSupCategory.map((item, index) => <Option key={index} value={item._id}>{item.name}</Option>)}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label="Gi??"
          name="price"
          rules={[
            { type: 'number', required: true, message: 'Vui l??ng nh???p s??? ti???n!' },
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
          label="Gi?? sale"
          name="priceSale"
          rules={[
            { type: 'number', required: true, message: 'N???u kh??ng sale nh???p 0??!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('price') > value) {
                  return Promise.resolve();
                }
                return Promise.reject('Gi?? sale ph???i nh??? h??n gi?? g???c!');
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
                    rules={[{ required: true, message: 'Vui l??ng nh???p size!' }]}
                  >
                    <Input placeholder="Size" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="M??u s???c"
                    name={[name, 'colorProductId']}
                    fieldKey={[fieldKey, 'colorProductId']}
                    rules={[{ required: true, message: 'Vui l??ng nh???p m??u s???c!' }]}
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
                    label="S??? l?????ng"
                    name={[name, 'howNumber']}
                    fieldKey={[fieldKey, 'howNumber']}
                    rules={[{ required: true, message: 'Vui l??ng nh???p s??? l?????ng!' }]}
                  >
                    <Input placeholder="S??? l?????ng" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Th??m Size - M??u s???c - S??? l?????ng
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          label="M?? t???"
          name="description"
          rules={[
            {
              required: true,
              message: 'Vui l??ng nh???p m?? t???!',
            },
            {
              whitespace: true,
              message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!',
            },
            {
              min: 10,
              message: 'T???i thi???u 10 k?? t???!',
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
              label="H??nh ?????i di???n"
              name="imgUrl"
              rules={[{ required: true, message: 'Vui l??ng ch??n ???nh!' }]}
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
