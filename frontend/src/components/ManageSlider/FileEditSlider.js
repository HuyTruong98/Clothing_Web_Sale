import React from 'react';
import { Descriptions, Badge, Image, Upload, Button, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import * as ApiImg from '../../constants/url';

function FileEditSlider({ initialValue, getNameFile }) {
  function handleChangeFile(e) {
    getNameFile(e.file);
  }
  return (
    <>
      <Descriptions bordered>
        <Descriptions.Item>
          <Badge status="processing" text="Thay đổi hình slide" />
          <div style={{ paddingTop: '20px' }}>
            {/* {
              initialValue.imgSlider && initialValue.imgSlider !== null && initialValue.imgSlider !== undefined
              &&
              <Image
                style={{ width: '100%', height: '100%' }}
                src={`${ApiImg.serverImg}/${initialValue.imgSlider}`}
              />
            } */}
            {/* fix lỗi update bị lỗi về /upload/[object%20File] và ko thêm mới được */}
          </div>
        </Descriptions.Item>
        <Form.Item
          name="imgSlider"
        >
          <Upload
            listType="picture"
            onChange={(e) => handleChangeFile(e)}
            accept="image/png, image/gif, image/jpeg"
            maxCount={1}
          // onRemove={() => handleRemoveFile(indexImg)}
          >
            <Button style={{ marginRight: '30px' }} type="link" icon={<EditOutlined />} />
          </Upload>
        </Form.Item>
      </Descriptions>
    </>
  );
}

export default FileEditSlider;
