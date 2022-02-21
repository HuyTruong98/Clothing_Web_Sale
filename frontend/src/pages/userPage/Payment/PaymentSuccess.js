/* eslint-disable no-unused-vars */
import React from 'react';
import Lottie from 'react-lottie';
import * as location from '../../../JSON/71390-shopping-cart-loader.json';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import * as URL from '../../../constants/url';
import { Button } from 'antd';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
function PaymentSuccess(props) {
  return (
    <>
      <div className="breadcrumb_background">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 a-left">
              <p><Link style={{ color: 'white' }} to={URL.HOME} className="my-link hover-link">Trang chủ</Link> &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Đặt hàng thành công</span></p>
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
      <div className="breadcrumb-product-detail-1" style={{ textAlign: 'center' }}>
        <h3 style={{ paddingBottom: '40px' }}>Cảm ơn bạn đã lựa chọn sản phẩm của chúng tôi!</h3>
        <Button
          style={{ backgroundColor: '#ffac4b', height: '40px', border: 'none' }}
        >
          <Link to={URL.PROFILE}>
            <strong>Xem đơn hàng </strong>
          </Link>
        </Button>,
        <Button
          style={{ backgroundColor: '#ffac4b', height: '40px', border: 'none' }}
        >
          <Link to={URL.HOME}>
            <strong>Tiếp tục mua sắm</strong>
          </Link>
        </Button>
      </div>
    </>
  );
}

export default PaymentSuccess;