/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import * as URL from '../../../constants/url';
import * as actProduct from '../../../redux/actions/managerProducts/actManageProducts';
import SlickImageUser from '../slick-Image-user';
import RenderProduct from './renderProduct';
import { Row, Col, Modal, Card, Image, Button, Pagination } from 'antd';
import ProductSeen from '../product-seen';

function Products({ match }) {
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.manageProducts.list);
  const totalPage = useSelector((state) => state.manageTotalProduct.item);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 8,
    createdAt: -1,
    price: 0,
  });

  function setRenderProductNew() {
    const sort = -1;
    setFilter((filter) => ({ ...filter, createdAt: sort, price: 0, page: 1 }));
  }

  function setRenderProductOld() {
    const sort = 1;
    setFilter((filter) => ({ ...filter, createdAt: sort, price: 0, page: 1 }));
  }

  function setRenderPriceUp() {
    const sort = 1
    setFilter((filter) => ({ ...filter, price: sort, page: 1 }));
  }

  function setRenderPriceDown() {
    const sort = -1
    setFilter((filter) => ({ ...filter, price: sort, page: 1 }));
  }

  useEffect(() => {
    dispatch(actProduct.actFetchProductsRequest(filter));
    dispatch(actProduct.actFetchPaginationProductRequest());
  }, [filter]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="breadcrumb_background">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 a-left">
              <p><Link style={{ color: 'white' }} to={URL.HOME} className="my-link hover-link">Trang ch???</Link> &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>T???t c??? s???n ph???m</span></p>
            </div>
            <div className="main_container collection col-md-12 col-lg-12">
              <SlickImageUser />
              <div className="all-product-title">
                <strong>T???T C??? S???N PH???M</strong>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 d-none d-md-block sortby">
                <aside className="aside-items base-sort-product">
                  <div className="aside-title">
                    <img src="https://bizweb.dktcdn.net/100/331/067/themes/823156/assets/i-sort.png?1625781892113" alt="Young Green - YG Shop" />
                    &nbsp;  S???p x???p theo:
                  </div>
                  <div className="aside-content filter-group">
                    <a onClick={() => setRenderProductNew()}>M???i nh???t</a>
                    <a onClick={() => setRenderProductOld()}>C?? nh???t</a>
                    <a onClick={() => setRenderPriceUp()}>Gi?? t??ng d???n</a>
                    <a onClick={() => setRenderPriceDown()}>Gi?? gi???m d???n</a>
                  </div>
                </aside>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 sortby-product">
                <div className="filter-all">
                  <img src="https://bizweb.dktcdn.net/100/331/067/themes/823156/assets/i-filter.png?1625781892113" alt="Young Green - YG Shop" />  &ensp;
                  <strong>B??? l???c</strong>
                </div>
              </div>
              <div className="row renderProductAll">
                <RenderProduct
                  listProduct={listProduct}
                  totalPage={totalPage}
                  filter={filter}
                  setFilter={setFilter}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="product-seen">
          <ProductSeen />
        </div>
        <div style={{ width: '100%', height: '100px' }}></div>
      </div>
    </>
  );
}

export default Products;