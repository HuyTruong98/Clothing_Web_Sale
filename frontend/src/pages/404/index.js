/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import * as URL from '../../constants/url';

function NotFound(props) {
  return (
    <>
      <div className="breadcrumb_background">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 a-left">
              <p><Link style={{ color: 'white' }} to={URL.HOME} className="my-link hover-link">Trang chủ</Link> &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>404 NOT FOUND</span></p>
            </div>
          </div>
        </div>
      </div>
      <div className="breadcrumb-product-detail-not-found">
        <div className="title-page-not-found">
          <h4>404</h4>
          <h4>Not Found</h4>
          <h3>Không tìm thấy trang</h3>
        </div>
      </div>
    </>
  );
}

export default NotFound;