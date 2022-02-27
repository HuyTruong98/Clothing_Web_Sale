/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import * as URL from '../../../constants/url';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Card, Row, Col, Badge, Select, Radio, InputNumber, Collapse } from 'antd';
import { renderMoney } from '../../../constants/renderConvert';
import * as API from '../../../constants/url';
import * as actCity from '../../../redux/actions/manageCity/actManageCity';
import { CaretRightOutlined } from '@ant-design/icons';

function FormPayment({ listCart, listColor, city, form, setTotalPrice, priceTransportFee, setPriceTransportFee }) {
  const { Panel } = Collapse;
  const { TextArea } = Input;
  const { Option } = Select;
  const dispatch = useDispatch();
  const [codePriceSale, setCodePriceSale] = useState(0);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [addressDelivery, setAddressDelivery] = useState();
  const [recipientArea, setRecipientArea] = useState();
  const [methodDelivery, setMethodDelivery] = useState([]);

  const handleChangeWard = (value) => {
    if (value) {
      setRecipientArea(value);
      const methodAll = { shop_id: 2488704, from_district: 2075, to_district: addressDelivery };
      dispatch(actCity.actDeliveryMethodRequest(methodAll, setMethodDelivery));
      form.setFieldsValue({
        transMethod: undefined,
      });
    }
    setPriceTransportFee({ ...priceTransportFee, total: 0 });
  };

  const handleChangeDistrict = (value) => {
    if (value) {
      setAddressDelivery(value);
      const newValue = { district_id: value };
      dispatch(actCity.actFetchWardRequest(newValue, setWard));
      form.setFieldsValue({
        ward: undefined,
        transMethod: undefined,
      });
    }
    setPriceTransportFee({ ...priceTransportFee, total: 0 });
    setMethodDelivery([]);
  };

  const handleChangeCity = (value) => {
    if (value) {
      const newValue = { province_id: value };
      dispatch(actCity.actFetchDistrictRequest(newValue, setDistrict));
      form.setFieldsValue({
        district: undefined,
        ward: undefined,
        transMethod: undefined,
      });
    }
    setPriceTransportFee({ ...priceTransportFee, total: 0 });
    setWard([]);
    setMethodDelivery([]);
  };

  function renderSize(color) {
    const renderColor = listColor.find((item) => item._id === color);
    return renderColor ? renderColor.name : 'unisex';
  }

  function showSubToTal(listCart) {
    let total = 0;
    if (listCart.length > 0) {
      for (var i = 0; i < listCart.length; i++) {
        total += (listCart[i].priceSale ? listCart[i].priceSale : listCart[i].price) * listCart[i].quantily;
      }
    }
    return renderMoney(total);
  }

  let totalAll = 0;
  function renderAllMoney(listCart) {
    let total1 = 0;
    if (listCart.length > 0) {
      for (var i = 0; i < listCart.length; i++) {
        if (codePriceSale) {
          total1 = (total1 + (listCart[i].priceSale ? listCart[i].priceSale : listCart[i].price) * listCart[i].quantily);
          totalAll = total1 + priceTransportFee?.total - codePriceSale;
        } else {
          total1 = (total1 + (listCart[i].priceSale ? listCart[i].priceSale : listCart[i].price) * listCart[i].quantily);
          totalAll = total1 + (priceTransportFee ? priceTransportFee?.total : 0);
        }
      }
    }
    setTotalPrice(totalAll)
    return renderMoney(totalAll);
  }

  function handleChangePriceTravel(value, listCart) {
    let total1 = 0
    if (listCart.length > 0) {
      for (var i = 0; i < listCart.length; i++) {
        if (codePriceSale) {
          total1 = (total1 + (listCart[i].priceSale ? listCart[i].priceSale : listCart[i].price) * listCart[i].quantily);
          totalAll = total1 + priceTransportFee?.total - codePriceSale;
        } else {
          total1 = (total1 + (listCart[i].priceSale ? listCart[i].priceSale : listCart[i].price) * listCart[i].quantily);
          totalAll = total1 + (priceTransportFee ? priceTransportFee?.total : 0);
        }
      }
    }
    const newValues = {
      shop_id: 2488704,
      service_id: value,
      insurance_value: totalAll,
      coupon: null,
      to_ward_code: recipientArea,
      to_district_id: addressDelivery,
      from_district_id: 2075,
      weight: 500,
      height: 28,
      length: 12,
      width: 12,
    }
    dispatch(actCity.actPriceTransportFeeRequest(newValues, setPriceTransportFee));
  }

  function handleCodeSale(e) {
    if (e.target.value === 'FREESHIPWD') {
      setCodePriceSale(20000);
    } else if (e.target.value === 'CUSTOM-VIP-2207') {
      setCodePriceSale(35000);
    } else {
      setCodePriceSale(0);
    }
  }
  return (
    <>
      <Card style={{ width: "60%" }}
        cover={
          <div className="logo-payment">
            <img alt="example" src="https://bizweb.dktcdn.net/100/331/067/themes/823156/assets/checkout_logo.png" width="50%" height="150px" />
          </div>
        }
        actions={[
          <div style={{ textAlign: 'right', marginRight: '40px' }}>
            <div>
              <p style={{ color: '#1990c6' }}>Cảm ơn vì đã chọn chúng tôi !</p>
            </div>
            © 2021 Young Green by YG SHOP
          </div>
        ]}
      >
        <Row gutter={24}>
          <Col span={2}></Col>
          <Col span={10}>
            <div className="title-info-order">
              <strong >Thông tin mua hàng:</strong>
            </div>
            <Form.Item
              name="email"
              validateFirst
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập email!',
                },
                {
                  type: 'email',
                  message: 'Email không đúng định dạng!',
                },
                {
                  whitespace: true,
                  message: 'Vui lòng không nhập khoảng trống'
                },
                {
                  max: 30,
                  message: 'Tối đa 30 ký tự!',
                },
              ]}
              hasFeedback
            >
              <Input
                size="large"
                placeholder="Nhập Email (tuỳ chọn)"
                style={{ width: '100%', borderRadius: '5px' }}
              />
            </Form.Item>

            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập họ và tên!',
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

              <Input size="large" placeholder="Họ và tên"
                style={{ width: '100%', borderRadius: '5px' }}
              />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              rules={[
                {
                  type: 'number',
                  required: true,
                  message: 'Vui lòng nhập tên số điện thoại!',
                },
              ]}
              hasFeedback
            >

              <InputNumber
                size="large"
                placeholder="Số điện thoại"
                style={{ width: '100%', borderRadius: '5px' }}
                addonBefore="+84"
              />
            </Form.Item>

            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên địa chỉ!',
                },
                {
                  whitespace: true,
                  message: 'Vui lòng không nhập khoảng trống!',
                },
              ]}
              hasFeedback
            >
              <Input size="large" placeholder="Địa chỉ"
                style={{ width: '100%', borderRadius: '5px' }}
              />
            </Form.Item>

            Tỉnh, thành: <br />
            <br />

            <Form.Item
              name="city"
              rules={[{ required: true, message: 'Vui lòng chọn tỉnh thành!' }]}
            >
              <Select
                placeholder="Tỉnh thành"
                style={{ width: '100%' }}
                onChange={handleChangeCity}
              >
                {
                  city.map((item, index) => {
                    return (
                      <Option key={index} value={item.ProvinceID}>{item.ProvinceName}</Option>
                    );
                  })
                }
              </Select>
            </Form.Item>

            Quận, huyện: <br /> <br />

            <Form.Item
              name="district"
              rules={[{ required: true, message: 'Vui lòng chọn quận huyện!' }]}
            >
              <Select
                placeholder="Quận huyện"
                style={{ width: '100%' }}
                onChange={handleChangeDistrict}
              >
                {
                  district.map((item, index) => {
                    return (
                      <Option key={index} value={item.DistrictID}>{item.DistrictName}</Option>
                    );
                  })
                }
              </Select>
            </Form.Item>

            Phường, xã: <br /> <br />
            <Form.Item
              name="ward"
              rules={[{ required: true, message: 'Vui lòng chọn phường, xã!' }]}
            >

              <Select
                placeholder="Phường, xã"
                style={{ width: '100%' }}
                onChange={handleChangeWard}
              >
                {
                  ward.map((item, index) => {
                    return (
                      <Option key={index} value={item.WardCode}>{item.WardName}</Option>
                    );
                  })
                }
              </Select>
            </Form.Item>

            <Form.Item
              name="noteCustomer"
            >
              <TextArea placeholder="Ghi chú (tuỳ chọn)" rows={3} style={{ width: '100%', marginTop: '40px', marginBottom: '20px', borderRadius: '5px' }} />
            </Form.Item>
          </Col>

          <Col span={1}></Col>

          <Col span={11}>
            <div className="title-method-express">
              <strong>Vận chuyển:</strong>
            </div>
            <div style={{ marginBottom: '12px' }}>
              Phương thức vận chuyển:
            </div>

            <Form.Item
              name="transMethod"
              rules={[{ required: true, message: 'Vui lòng chọn phương thức vận chuyển!' }]}
            >
              <Select onChange={(e) => handleChangePriceTravel(e, listCart)} placeholder="Phương thức vận chuyển:" style={{ width: '90%', marginBottom: '30px' }}
              >
                {
                  methodDelivery.map((item, index) => {
                    return (
                      <Option key={index} value={item.service_id}>{item.short_name}</Option>
                    );
                  })
                }
              </Select>
            </Form.Item>

            <div className="title-method-payment">
              <div className="title-method-payment-2">
                <strong>Thanh toán:</strong>
              </div>
              <div className="title-method-payment-3">
                <Form.Item
                  name="methodPay"
                  rules={[{ required: true, message: 'Vui lòng chọn phương thức vận chuyển!' }]}
                >
                  <Radio.Group>
                    <Collapse
                      bordered={false}
                      defaultActiveKey={['1']}
                      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                      className="site-collapse-custom-collapse"
                    >
                      <Panel header="𝚃𝚑𝚊𝚗𝚑 𝚝𝚘𝚊́𝚗 𝚔𝚑𝚒 𝚜𝚑𝚒𝚙 (𝙲𝙾𝙳)" key="1" className="site-collapse-custom-panel" extra={<i className="fas fa-money-bill-alt icon-payment" aria-hidden="true"></i>}>
                        <Radio value="𝚃𝚑𝚊𝚗𝚑 𝚝𝚘𝚊́𝚗 𝚔𝚑𝚒 𝚜𝚑𝚒𝚙 (𝙲𝙾𝙳)">
                          Bạn chỉ phải thanh toán khi nhận được hàng. <br />
                          <i className="request-method"> Được xem hàng, không được thử </i>
                        </Radio>
                      </Panel>
                      <Panel header="𝚃𝚑𝚊𝚗𝚑 𝚝𝚘𝚊́𝚗 𝚚𝚞𝚊 𝚟𝚒́ đ𝚒𝚎̣̂𝚗 𝚝𝚞̛̉ 𝙼𝚘𝙼𝚘" key="2" className="site-collapse-custom-panel" extra={<img className="icon-payment-img" src="https://bizweb.dktcdn.net/assets/admin/images/logomm1.png?v=1" aria-hidden="true" width="40px" />}>
                        <Radio value="𝚃𝚑𝚊𝚗𝚑 𝚝𝚘𝚊́𝚗 𝚚𝚞𝚊 𝚟𝚒́ đ𝚒𝚎̣̂𝚗 𝚝𝚞̛̉ 𝙼𝚘𝙼𝚘">
                          Thanh toán nhanh và an toàn qua MoMo. <br />
                          Chủ tài khoản: Trương Hoàng Huy.<br />
                          + TK momo: 0793329299.
                        </Radio>
                      </Panel>
                      <Panel header="𝙲𝚑𝚞𝚢𝚎̂̉𝚗 𝚔𝚑𝚘𝚊̉𝚗 𝚗𝚐𝚊̂𝚗 𝚑𝚊̀𝚗𝚐" key="3" className="site-collapse-custom-panel" extra={<i className="fab fa-cc-visa icon-payment" aria-hidden="true"></i>}>
                        <Radio value="𝙲𝚑𝚞𝚢𝚎̂̉𝚗 𝚔𝚑𝚘𝚊̉𝚗 𝚗𝚐𝚊̂𝚗 𝚑𝚊̀𝚗𝚐">
                          Chủ tài khoản: Trương Hoàng Huy.<br />
                          + Ngân hàng Vietcombank - Đà Nẵng: 19037854119011 <br />
                          + Ngân hàng Techcomebank - Đà Nẵng: 19037854119011 <br />
                          + Ngân hàng Agribank  - Đà Nẵng : 19037854119011
                        </Radio>
                      </Panel>
                    </Collapse>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      <Card style={{ width: "40%", background: '#fafafa', paddingTop: '40px', paddingLeft: '30px' }} bordered={false}>
        <div className="title-oder">
          <strong>Đơn hàng của bạn:</strong>
        </div>

        {
          listCart.length < 5
            ?
            (
              <div className="product-order-1">
                {
                  listCart.map((item, index) => {
                    return (
                      <div className="img-oder">
                        <div className="img-product-order">
                          {
                            Array.isArray(item && item.imgProduct) && item.imgProduct.length > -1 && item.imgProduct.map((itemImg, indexImg) => {
                              if (indexImg === 0) {
                                return (
                                  <img src={`${API.serverImg}/${itemImg.imgUrl}`} width="100%" height="100%" />
                                )
                              }
                            })
                          }

                          <Badge count={item.quantily} style={{ marginBottom: '55px' }}>
                          </Badge>
                        </div>
                        <div className="name-size">
                          <Link
                            to={{
                              pathname: `${API.PRODUCT}/${item._id}`,
                            }}
                            style={{ color: 'black' }}
                          >
                            <a>
                              {item.name}
                            </a>
                          </Link>
                          <p>{item.size} / {renderSize(item.colorProductId)}</p>
                          <p> {item.priceSale === 0 ? '' : `Giảm giá: ${Math.ceil(100 - ((item.priceSale) / (item.price) * 100))} %`}</p>
                        </div>
                        <div className="money-payment">
                          <p style={{ fontSize: '17px' }}>{renderMoney(item.priceSale ? item.priceSale : item.price)}</p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
            :
            (
              <div className="product-order-2">
                {
                  listCart.map((item, index) => {
                    return (
                      <div className="img-oder">
                        <div className="img-product-order">
                          {
                            Array.isArray(item && item.imgProduct) && item.imgProduct.length > -1 && item.imgProduct.map((itemImg, indexImg) => {
                              if (indexImg === 0) {
                                return (
                                  <img src={`${API.serverImg}/${itemImg.imgUrl}`} width="100%" height="100%" />
                                )
                              }
                            })
                          }

                          <Badge count={item.quantily} style={{ marginBottom: '55px' }}>
                          </Badge>
                        </div>
                        <div className="name-size">
                          <Link
                            to={{
                              pathname: `${API.PRODUCT}/${item._id}`,
                            }}
                            style={{ color: 'black' }}
                          >
                            <a>
                              {item.name}
                            </a>
                          </Link>
                          <p>{item.size} / {renderSize(item.colorProductId)}</p>
                          <p> {item.priceSale === 0 ? '' : `Giảm giá: ${Math.ceil(100 - ((item.priceSale) / (item.price) * 100))} %`}</p>
                        </div>
                        <div className="money-payment">
                          <p style={{ fontSize: '17px' }}>{renderMoney(item.priceSale ? item.priceSale : item.price)}</p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
        }

        <div className="codeSale">
          <Form.Item
            name="codeSale"
          >
            <Input size="large" placeholder="Nhập mã giảm giá.."
              onChange={(e) => handleCodeSale(e)}
              style={{ height: '50px', borderRadius: '5px', width: '400px' }}
            />
          </Form.Item>
        </div>
        <div className="temporary-amount">
          <p>Tạm tính :</p>
          <p>
            {showSubToTal(listCart)}
          </p>
        </div>
        <div className="transport-fee">
          <p>Phí vận chuyển :</p>
          {
            priceTransportFee
              ?
              (
                <>
                  <p>{renderMoney(priceTransportFee?.total)}</p>
                </>
              )
              :
              (
                <>
                  <p>{renderMoney(0)}</p>
                </>
              )
          }
        </div>
        <div className="transport-fee">
          <p>Giảm giá :</p>
          <p> - {renderMoney(codePriceSale)}</p>
        </div>
        <div className="total-money">
          <p>Tổng cộng:</p>
          <p style={{ color: '#2a9dcc' }}>{renderAllMoney(listCart)}</p>
        </div>

        <div className="order-home">
          <Button
            htmlType="submit"
            style={{ backgroundColor: '#ffac4b', height: '50px', border: 'none', marginTop: '5px', borderRadius: '5px' }}
          >
            Đặt hàng
          </Button>
        </div>
      </Card>
    </>
  );
}

export default FormPayment;
