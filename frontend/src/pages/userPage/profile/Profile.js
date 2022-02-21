/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actOrder from '../../../redux/actions/manageOrderListCart/actManageOrderListCart';
import * as actCity from '../../../redux/actions/manageCity/actManageCity';
import * as ApiImg from '../../../constants/url';
import { renderMoney } from '../../../constants/renderConvert';

function Profile(props) {
  const { Step } = Steps;
  const dispatch = useDispatch();
  const account = useSelector((state) => state.manageLogin.account_current);
  const account_current = account.user ? account.user : account;
  const [listOrder, setListOrder] = useState([]);
  const [city, setCity] = useState([]);

  function showSubToTal(price, priceSale, quantily) {
    return renderMoney(priceSale !== 0 ? priceSale * quantily : price * quantily);
  }

  function renderCityId(value) {
    const nameCity = city.find((item) => item.ProvinceID === value)
    return nameCity ? nameCity.ProvinceName : ''
  }

  const dataListOrder = [];
  if (listOrder.filter((item) => item.account_current === account_current.id).length > 0) {
    listOrder.filter((item) => item.account_current === account_current.id).map((itemOrder) => {
      dataListOrder.push(itemOrder);
    });
  }

  useEffect(() => {
    dispatch(actOrder.actFetchOderCartRequest(setListOrder));
    dispatch(actCity.actFetchCityRequest(setCity));
  }, []);
  return (
    <>
      <div className="breadcrumb_background">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 a-left">
              <p> Trang chủ &ensp;  <i className="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Thông tin tài khoản</span></p>
            </div>
          </div>
        </div>
      </div>
      <div className="breadcrumb-product-detail-profile">
        <div className="container main-section-profile">
          <div className="row user-left-part">
            <div className="col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left">
              <div className="row">
                <div className="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center">
                  {account_current.img
                    ?
                    (
                      <img src={account_current.img} className="rounded-circle" />
                    )
                    :
                    (
                      <Avatar
                        style={{ marginTop: '60px', background: '#f56a00', width: '120px', height: '120px', fontSize: '70px', paddingTop: '40px' }}
                      >
                        {account_current.name.slice(0, 1)}
                      </Avatar>
                    )}
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12 user-detail-section1 text-center">
                </div>
              </div>
            </div>
            <div className="col-md-9 col-sm-9 col-xs-12 pull-right profile-right-section">
              <div className="row profile-right-section-row">
                <div className="col-md-12 profile-header">
                  <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-6 profile-header-section1 pull-left">
                      <h1> <img src="https://bizweb.dktcdn.net/100/331/067/themes/823156/assets/logo_contact.png" /></h1>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-6 profile-header-section1 text-right pull-rigth"></div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-10">
                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                          <a style={{ color: '#ffac4b' }}
                            className="nav-link active"
                            href="#profile"
                            role="tab"
                            data-toggle="tab"
                          >
                            <i className="fa fa-user" aria-hidden="true">
                            </i> &ensp;
                            <strong>Thông tin người dùng</strong>
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div
                          role="tabpanel"
                          className="tab-pane fade show active"
                          id="profile"
                          style={{ marginTop: '20px', marginLeft: '20px', fontWeight: '600' }}
                        >
                          <div className="row">
                            <div className="col-md-3">
                              <label>Họ và tên:</label>
                            </div>
                            <div className="col-md-6">
                              <p>{account_current.name}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-3">
                              <label>Email</label>
                            </div>
                            <div className="col-md-6">
                              <p>{account_current.email}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-3">
                              <label>Đối tượng</label>
                            </div>
                            <div className="col-md-6">
                              <p>{account_current.role}</p>
                              <i class="far fa-clipboard-list"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        dataListOrder.length > 0
          ?
          (
            Array.isArray(dataListOrder) && dataListOrder.length > 0 &&
            dataListOrder.map((item, index) => {
              return (
                <div key={index} className="container" style={{ marginBottom: '100px' }}>
                  <div className="row col-md-offset-2">
                    <div className="col-md-12 step-invoice">
                      <Steps current={item.current_order}>
                        <Step title="Đơn Hàng Đã Đặt" icon={<i className="fas fa-list-alt"></i>} />
                        <Step title="Chờ Lấy Hàng" icon={<i className="fas fa-box-open"></i>} />
                        <Step title="Đang Giao" icon={<i className="fas fa-shipping-fast"></i>} />
                        <Step title="Đã Giao Xong" icon={<i className="fas fa-clipboard-check"></i>} />
                      </Steps>
                    </div>
                    <div className="col-md-8">
                      <div className="row main-section">
                        <div className="col-md-12 col-sm-12 invoice-header">
                          <div className="row">
                            <div className="col-md-6 col-sm-6 col-xs-6">
                              <h1> <img src="https://thumb.danhsachcuahang.com/image/2019/10/cua-hang-yg-shop-thumb-348.jpg" width="70px" /></h1>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-6 text-right">
                              <p>Hoá đơn</p>
                              <span>{new Date(item.updatedAt).toISOString().substring(0, 10)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-sm-12 invoice-content">
                          <div className="row">
                            <div className="col-md-6 col-sm-6 col-xs-6">
                              <p>From.</p>
                              <p>YG SHOP</p>
                              <p>Tổ 1</p>
                              <p>Tỉnh Hà Giang</p>
                              <p>Huyện Bắc Mê</p>
                              <p>Thị Trấn Yên Phú</p>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-6 text-right">
                              <p>To.</p>
                              <p>{item.name}</p>
                              <p>{item.email}</p>
                              <p>0{item.phoneNumber}</p>
                              <p>{item.address}</p>
                              <p>{renderCityId(item.city)}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-sm-12 text-right">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Hình ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Size</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                              </tr>
                            </thead>
                            <tbody>

                              {
                                Array.isArray(item.oderListCart) && item.oderListCart.length > 0
                                && item.oderListCart.map((itemListOrder, indexListOrder) => {
                                  return (
                                    <>
                                      <tr key={indexListOrder}>
                                        <td>
                                          <img src={`${ApiImg.serverImg}/${itemListOrder.imgProduct}`} width="70px" />
                                        </td>
                                        <td>
                                          {itemListOrder.name}
                                        </td>
                                        <td>{itemListOrder.size}</td>
                                        <td>{itemListOrder.quantily}</td>
                                        <td>{renderMoney(itemListOrder.priceSale !== 0 ? itemListOrder.priceSale : itemListOrder.price)}</td>
                                        <td>{showSubToTal(itemListOrder.price, itemListOrder.priceSale, itemListOrder.quantily)}</td>
                                      </tr>
                                    </>
                                  );
                                })
                              }

                              <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Phí vận chuyển</td>
                                <td>{renderMoney(item.priceTransportFee)}</td>
                              </tr>

                              <tr>
                                <td></td>
                                <td></td>
                                <td colspan="3" style={{ textAlign: 'right' }}>Tổng tiền :</td>
                                <td>{renderMoney(item.priceOrder)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )
          :
          ''
      }
    </>
  );
}

export default Profile;
