/* eslint-disable no-const-assign */
/* eslint-disable no-array-constructor */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
import React from 'react';
import { Descriptions, Badge, Popconfirm, Image, Upload, Button, Form, Checkbox, DatePicker } from 'antd';
import { QuestionCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import * as ApiImg from '../../constants/url';
import * as Message from '../../constants/Message';
import moment from 'moment';

function FileEdit({
  initialValues, getNameFile, file, setFile, setBestSeller,
  setArrImgProductObject, arrImgProductObject, setCountDate,
}) {
  const newArr = initialValues.imgProduct;

  function handleChangeFile(e, indexImg) {
    getNameFile(e, indexImg);
    setFile([...file, e.file]);
  }
  function onDeleteRequest(indexImg, value) {
    newArr.filter((itemChange, indexChange) => {
      if (indexChange === indexImg && value._id === itemChange._id) {
        itemChange.imgUrl = '';
      }
    });
    initialValues.imgProduct = [...newArr];
    setArrImgProductObject([...arrImgProductObject]);
  }

  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  // DealHot
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  // DealHot
  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }

  // DealHot Day
  function onChangeDate(value, dateString) {
    setCountDate(dateString);
  }

  // DealHot
  function onDeleteDealHot(value) {
    if (value) {
      console.log(value);
      setCountDate('');
    }
  }

  // Best Seller
  function handleClickBestSeller(value) {
    if (value.length === 1) {
      value.map((item) => {
        setBestSeller(item);
      });
    } else {
      setBestSeller('');
    }
  }
  return (
    <>
      {
        newArr && Array.isArray(newArr) && newArr.length > 0 && newArr.map((itemImg, indexImg) => {
          if (itemImg) {
            return (
              <Descriptions bordered>
                {
                  indexImg === 0
                    ? (
                      <>
                        <Descriptions.Item>
                          <Badge status="processing" text="Hình đại diện" />
                          <div style={{ paddingTop: '20px' }}>
                            <Image
                              style={{ width: '100%', height: '100%' }}
                              src={`${ApiImg.serverImg}/${itemImg.imgUrl}`}
                            />
                          </div>
                        </Descriptions.Item>
                      </>
                    )
                    : (
                      <>
                        <Descriptions.Item>
                          <Badge style={{ paddingRight: '13px' }} status="processing" text={`Ảnh slide ${indexImg}`} />
                          {
                            itemImg.imgUrl !== ''
                              ? (
                                <Image
                                  style={{ width: '75px', marginBottom: '10px', marginLeft: '0px' }}
                                  src={`${ApiImg.serverImg}/${itemImg.imgUrl}`}
                                />
                              )
                              : (
                                <img
                                  style={{ width: '75px', marginBottom: '10px', marginLeft: '0px' }}
                                  src={`${ApiImg.serverImg}/thaythe.png`}
                                />
                              )
                          }
                        </Descriptions.Item>
                      </>
                    )
                }
                <Form.Item
                  name="imgUrl"
                >
                  {
                    itemImg.imgUrl !== ''
                      ?
                      (
                        <>
                          <Popconfirm
                            placement="topLeft"
                            title={`${Message.BAN_CO_MUON_XOA_ANH}Ảnh slide ${indexImg} !`}
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            // eslint-disable-next-line no-underscore-dangle
                            onConfirm={() => onDeleteRequest(indexImg, itemImg)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button style={{ marginRight: '30px' }} type="link" icon={<DeleteOutlined style={{ color: 'red' }} />} />
                          </Popconfirm>
                        </>
                      )
                      :
                      (
                        <>
                          <Upload
                            listType="picture"
                            onChange={(e) => handleChangeFile(e, indexImg)}
                            accept="image/png, image/gif, image/jpeg"
                            maxCount={1}
                          >
                            <Button style={{ marginRight: '30px' }} type="link" icon={<EditOutlined />} />
                          </Upload>
                        </>
                      )
                  }
                </Form.Item>
              </Descriptions>
            );
          };
        })
      }
      <br />
      <Descriptions bordered style={{ paddingBottom: '20px' }}>
        <Descriptions.Item label="Best Seller">
          <Form.Item
            name="bestSeller"
          >
            <Checkbox.Group onChange={handleClickBestSeller}>
              <Checkbox value="best-seller">Chọn làm sản phẩm bán chạy</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Descriptions.Item>
      </Descriptions>
      {
        initialValues && initialValues.dealHot !== '' && initialValues.dealHot !== 'undefined'
          ?
          (
            <>
              <Descriptions bordered>
                <Descriptions.Item label="Hot Deal">
                  {initialValues && initialValues.dealHot}
                  <Form.Item
                    name="dealHot"
                  >
                    <Popconfirm
                      placement="topLeft"
                      title={`${Message.BAN_CO_MUON_XOA_ANH} !`}
                      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                      // eslint-disable-next-line no-underscore-dangle
                      onConfirm={() => onDeleteDealHot(initialValues)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="link" icon={<DeleteOutlined style={{ color: 'red' }} />} />
                    </Popconfirm>
                  </Form.Item>
                </Descriptions.Item>
              </Descriptions>
            </>
          )
          :
          (
            <>
              <Form.Item
                name="dealHot"
                label="Deal Hot cho sản phẩm 🔥"
              >
                <DatePicker
                  format="YYYY-MM-DD HH:mm:ss"
                  disabledDate={disabledDate}
                  disabledTime={disabledDateTime}
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                  onChange={onChangeDate}
                />
              </Form.Item>
            </>
          )
      }
    </>
  );
}
export default FileEdit;