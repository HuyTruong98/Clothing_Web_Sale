/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Route, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';
import Lottie from 'react-lottie';
import FormPayment from './Form.payMent';
import * as URL from '../../../constants/url';
import * as actColor from '../../../redux/actions/manageColor/actManageColor';
import * as location from '../../../JSON/63274-loading-animation.json';
import * as actCity from '../../../redux/actions/manageCity/actManageCity';
import * as actOderListCart from '../../../redux/actions/manageOrderListCart/actManageOrderListCart';
import * as actCart from '../../../redux/actions/manageCustomerCart/actCustomerCart';
import * as URL_SUCCESS from '../../../constants/url';
import * as actCodeSale from '../../../redux/actions/manageCodeSale/actManageCodeSale';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
function Payment() {
  const dispatch = useDispatch();
  const history = useHistory();
  const listCart = useSelector((state) => state.manageCustomerCart.list);
  const listColor = useSelector((state) => state.manageColor.list);
  const [loading, setLoading] = useState(undefined);
  const [city, setCity] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [form] = Form.useForm();
  const account = useSelector((state) => state.manageLogin.account_current);
  const [priceTransportFee, setPriceTransportFee] = useState();
  const [listCodeSale, setListCodeSale] = useState([]);

  const newCart = [];
  listCart.map((item, index) => {
    Array.isArray(item && item.imgProduct) &&
      item.imgProduct.length > 0 &&
      item.imgProduct.map((itemImg, indexImg) => {
        if (indexImg === 0) {
          const newItem = {
            ...item,
            imgProduct: itemImg.imgUrl,
          }
          newCart.push(newItem);
        }
      });
  });

  function onOrder(value) {
    const newValue = {
      ...value,
      codeSale: value.codeSale.toUpperCase(),
      priceOrder: totalPrice,
      oderListCart: newCart,
      account_current: account.user ? account.user.id : account.id,
      priceTransportFee: priceTransportFee.service_fee,
      current_order: 0,
    }
    const index = listCodeSale.findIndex((x) => x.code === newValue.codeSale);
    listCodeSale[index].quantily = listCodeSale[index].quantily !== 0 ? listCodeSale[index].quantily - 1 : listCodeSale[index].quantily;
    dispatch(actOderListCart.actCreateOderCartRequest(newValue));
    dispatch(actCart.resetCart([]));
    dispatch(actCodeSale.actUpdateCodeSalePayMentRequest(listCodeSale[index]._id, listCodeSale[index]));
    history.push(`${URL_SUCCESS.PAY_MENT_SUCCESS}`);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      dispatch(actColor.actFetchColorsRequest());
      dispatch(actCity.actFetchCityRequest(setCity));
      setLoading(true);
    }, 1500);
  }, []);
  return (
    <>
      {
        !loading
          ?
          (
            <>
              <div className="breadcrumb_background">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 a-left">
                      <p><Link style={{ color: 'white' }} to={URL.HOME} className="my-link hover-link">Trang chủ</Link> &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Thanh toán</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="spinner-show">
                <Lottie options={defaultOptions}
                  height={400}
                  width={400}
                />
              </div>
            </>
          )
          :
          (
            <>
              <div className="breadcrumb_background">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 a-left">
                      <p><Link style={{ color: 'white' }} to={URL.HOME} className="my-link hover-link">Trang chủ</Link> &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Thanh toán</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <Form
                name="basic"
                form={form}
                initialValues={{ remember: true }}
                onFinish={onOrder}
              >
                <div className="breadcrumb-product-detail-payment">
                  <FormPayment
                    listCart={listCart}
                    listColor={listColor}
                    city={city}
                    form={form}
                    setTotalPrice={setTotalPrice}
                    setPriceTransportFee={setPriceTransportFee}
                    priceTransportFee={priceTransportFee}
                    setListCodeSale={setListCodeSale}
                    listCodeSale={listCodeSale}
                  />
                </div>
              </Form>
            </>
          )
      }
    </>
  );
}

export default Payment;
