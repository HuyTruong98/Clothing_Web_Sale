/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from 'react';
import * as URL from '../../../constants/url';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Card, Row, Col, Badge, Select, Radio, InputNumber, Collapse } from 'antd';
import { renderMoney, removeVietnameseTones } from '../../../constants/renderConvert';
import { CaretRightOutlined, SearchOutlined } from '@ant-design/icons';
import * as API from '../../../constants/url';
import * as actCity from '../../../redux/actions/manageCity/actManageCity';
import * as actCodeSale from '../../../redux/actions/manageCodeSale/actManageCodeSale';

function FormPayment({ listCart, listColor, city, form, listCodeSale, setListCodeSale,
  setTotalPrice, priceTransportFee, setPriceTransportFee }) {
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
  const [searchTerm, setSearchTerm] = useState('');
  const typingTimeoutRef = useRef(null);

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
        if (listCodeSale.length === 1 && listCodeSale[i].quantily !== 0) {
          total1 = (total1 + (listCart[i].priceSale ? listCart[i].priceSale : listCart[i].price) * listCart[i].quantily);
          totalAll = total1 + (priceTransportFee ? priceTransportFee?.total : 0) - listCodeSale[0].price;
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

  function onChangeCodeSale(newFilter) {
    if (newFilter.searchTerm.length > 0 && newFilter.searchTerm.length < 3 || newFilter.searchTerm.length === 0) {
      return;
    } else {
      const filter = {
        code: newFilter.searchTerm,
      };
      dispatch(actCodeSale.actFetchCodeSaleRequest(filter, setListCodeSale));
    }
  }

  function handleCodeSale(e) {
    const value = e.target.value.toUpperCase();
    setSearchTerm(value);
    if (!onChangeCodeSale) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValue = {
        searchTerm: value,
      };
      onChangeCodeSale(formValue);
    }, 400);
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
              <p style={{ color: '#1990c6' }}>C???m ??n v?? ???? ch???n ch??ng t??i !</p>
            </div>
            ?? 2021 Young Green by YG SHOP
          </div>
        ]}
      >
        <Row gutter={24}>
          <Col span={2}></Col>
          <Col span={10}>
            <div className="title-info-order">
              <strong >Th??ng tin mua h??ng:</strong>
            </div>
            <Form.Item
              name="email"
              validateFirst
              rules={[
                {
                  required: true,
                  message: 'Vui l??ng nh???p email!',
                },
                {
                  type: 'email',
                  message: 'Email kh??ng ????ng ?????nh d???ng!',
                },
                {
                  whitespace: true,
                  message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng'
                },
                {
                  max: 30,
                  message: 'T???i ??a 30 k?? t???!',
                },
              ]}
              hasFeedback
            >
              <Input
                size="large"
                placeholder="Nh???p Email (tu??? ch???n)"
                style={{ width: '100%', borderRadius: '5px' }}
              />
            </Form.Item>

            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui l??ng nh???p h??? v?? t??n!',
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

              <Input size="large" placeholder="H??? v?? t??n"
                style={{ width: '100%', borderRadius: '5px' }}
              />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              rules={[
                {
                  type: 'number',
                  required: true,
                  message: 'Vui l??ng nh???p t??n s??? ??i???n tho???i!',
                },
              ]}
              hasFeedback
            >

              <InputNumber
                size="large"
                placeholder="S??? ??i???n tho???i"
                style={{ width: '100%', borderRadius: '5px' }}
                addonBefore="+84"
              />
            </Form.Item>

            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: 'Vui l??ng nh???p t??n ?????a ch???!',
                },
                {
                  whitespace: true,
                  message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!',
                },
              ]}
              hasFeedback
            >
              <Input size="large" placeholder="?????a ch???"
                style={{ width: '100%', borderRadius: '5px' }}
              />
            </Form.Item>

            T???nh, th??nh: <br />
            <br />

            <Form.Item
              name="city"
              rules={[{ required: true, message: 'Vui l??ng ch???n t???nh th??nh!' }]}
            >
              <Select
                placeholder="T???nh th??nh"
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

            Qu???n, huy???n: <br /> <br />

            <Form.Item
              name="district"
              rules={[{ required: true, message: 'Vui l??ng ch???n qu???n huy???n!' }]}
            >
              <Select
                placeholder="Qu???n huy???n"
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

            Ph?????ng, x??: <br /> <br />
            <Form.Item
              name="ward"
              rules={[{ required: true, message: 'Vui l??ng ch???n ph?????ng, x??!' }]}
            >

              <Select
                placeholder="Ph?????ng, x??"
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
              <TextArea placeholder="Ghi ch?? (tu??? ch???n)" rows={3} style={{ width: '100%', marginTop: '40px', marginBottom: '20px', borderRadius: '5px' }} />
            </Form.Item>
          </Col>

          <Col span={1}></Col>

          <Col span={11}>
            <div className="title-method-express">
              <strong>V???n chuy???n:</strong>
            </div>
            <div style={{ marginBottom: '12px' }}>
              Ph????ng th???c v???n chuy???n:
            </div>

            <Form.Item
              name="transMethod"
              rules={[{ required: true, message: 'Vui l??ng ch???n ph????ng th???c v???n chuy???n!' }]}
            >
              <Select onChange={(e) => handleChangePriceTravel(e, listCart)} placeholder="Ph????ng th???c v???n chuy???n:" style={{ width: '90%', marginBottom: '30px' }}
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
                <strong>Thanh to??n:</strong>
              </div>
              <div className="title-method-payment-3">
                <Form.Item
                  name="methodPay"
                  rules={[{ required: true, message: 'Vui l??ng ch???n ph????ng th???c v???n chuy???n!' }]}
                >
                  <Radio.Group>
                    <Collapse
                      bordered={false}
                      defaultActiveKey={['1']}
                      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                      className="site-collapse-custom-collapse"
                    >
                      <Panel header="???????????????????? ?????????????????? ???????????? ???????????????? (????????????)" key="1" className="site-collapse-custom-panel" extra={<i className="fas fa-money-bill-alt icon-payment" aria-hidden="true"></i>}>
                        <Radio value="???????????????????? ?????????????????? ???????????? ???????????????? (????????????)">
                          B???n ch??? ph???i thanh to??n khi nh???n ???????c h??ng. <br />
                          <i className="request-method"> ???????c xem h??ng, kh??ng ???????c th??? </i>
                        </Radio>
                      </Panel>
                      <Panel header="???????????????????? ?????????????????? ???????????? ?????????? ?????????????????? ???????????? ????????????????" key="2" className="site-collapse-custom-panel" extra={<img className="icon-payment-img" src="https://bizweb.dktcdn.net/assets/admin/images/logomm1.png?v=1" aria-hidden="true" width="40px" />}>
                        <Radio value="???????????????????? ?????????????????? ???????????? ?????????? ?????????????????? ???????????? ????????????????">
                          Thanh to??n nhanh v?? an to??n qua MoMo. <br />
                          Ch??? t??i kho???n: Tr????ng Ho??ng Huy.<br />
                          + TK momo: 0793329299.
                        </Radio>
                      </Panel>
                      <Panel header="???????????????????????????? ?????????????????????? ?????????????????? ??????????????????" key="3" className="site-collapse-custom-panel" extra={<i className="fab fa-cc-visa icon-payment" aria-hidden="true"></i>}>
                        <Radio value="???????????????????????????? ?????????????????????? ?????????????????? ??????????????????">
                          Ch??? t??i kho???n: Tr????ng Ho??ng Huy.<br />
                          + Ng??n h??ng Vietcombank - ???? N???ng: 19037854119011 <br />
                          + Ng??n h??ng Techcomebank - ???? N???ng: 19037854119011 <br />
                          + Ng??n h??ng Agribank  - ???? N???ng : 19037854119011
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
          <strong>????n h??ng c???a b???n:</strong>
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
                              pathname: `${API.PRODUCT}/${item._id}/${removeVietnameseTones(item.name)}`,
                            }}
                            style={{ color: 'black' }}
                          >
                            <a>
                              {item.name}
                            </a>
                          </Link>
                          <p>{item.size} / {renderSize(item.colorProductId)}</p>
                          <p> {item.priceSale === 0 ? '' : `Gi???m gi??: ${Math.floor(100 - ((item.priceSale) / (item.price) * 100))} %`}</p>
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
                          <p> {item.priceSale === 0 ? '' : `Gi???m gi??: ${Math.floor(100 - ((item.priceSale) / (item.price) * 100))} %`}</p>
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
            <Input
              size="large"
              placeholder="Nh???p m?? gi???m gi??.."
              onChange={(e) => handleCodeSale(e)}
              suffix={<SearchOutlined />}
              value={searchTerm}
              style={{ height: '50px', borderRadius: '5px', width: '400px' }}
            />
          </Form.Item>
        </div>
        <div className="temporary-amount">
          <p>T???m t??nh :</p>
          <p>
            {showSubToTal(listCart)}
          </p>
        </div>
        <div className="transport-fee">
          <p>Ph?? v???n chuy???n :</p>
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
          <p>Gi???m gi?? :</p>
          {
            listCodeSale.length === 1
              ?
              listCodeSale.map((item, index) => {
                if (item.quantily !== 0 && index < 1) {
                  return (
                    <p>-{renderMoney(item.price)}</p>
                  )
                }
              })
              :
              <p>-{renderMoney(0)}</p>
          }
        </div>
        <div className="total-money">
          <p>T???ng c???ng:</p>
          <p style={{ color: '#2a9dcc' }}>{renderAllMoney(listCart)}</p>
        </div>

        <div className="order-home">
          <Button
            htmlType="submit"
            style={{ backgroundColor: '#ffac4b', height: '50px', border: 'none', marginTop: '5px', borderRadius: '5px' }}
          >
            ?????t h??ng
          </Button>
        </div>
      </Card>
    </>
  );
}

export default FormPayment;
