import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Upload } from 'antd';
import FileEditSlider from './FileEditSlider';

// eslint-disable-next-line react/prop-types
function FormSlider({ form, onSave, file, setFile, initialValue, getNameFile }) {
  function handleChange({ fileList }) {
    if (fileList.length === 0) {
      setFile([]);
      form.setFieldsValue({
        imgSlider: undefined,
      });
    } else {
      setFile(fileList);
    }
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload Slide</div>
    </div>
  );

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
          label={!initialValue ? "Hình slide quảng cáo" : ''}
          name="imgSlider"
          rules={[{ required: true, message: 'Vui lòng chèn ảnh!' }]}
        >
          {
            !initialValue
              ?
              (
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  maxCount={1}
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleChange}
                >
                  {file.length === 0 ? uploadButton : null}
                </Upload>
              )
              :
              (
                <FileEditSlider
                  initialValue={initialValue}
                  getNameFile={getNameFile}
                />
              )
          }
        </Form.Item>
      </Form>
    </>
  );
}

export default FormSlider;
