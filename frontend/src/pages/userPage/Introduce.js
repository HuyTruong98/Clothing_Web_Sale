/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import * as URL from '../../constants/url';

function Introduce(props) {
  return (
    <>
      <div className="breadcrumb_background">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 a-left">
              <p><Link style={{ color: 'white' }} to={URL.HOME} className="my-link hover-link">Trang chủ</Link> &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Giới thiệu</span></p>
            </div>
          </div>
        </div>
      </div>
      <div className="breadcrumb-product-detail">
        Đây là trang giới thiệu
      </div>
    </>
  );
}

export default Introduce;
