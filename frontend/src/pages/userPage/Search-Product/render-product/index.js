/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Route, Link, NavLink, Redirect, useHistory } from 'react-router-dom';
import { Card, Image, Pagination } from 'antd';
import * as actProduct from '../../../../redux/actions/managerProducts/actManageProducts';
import * as API from '../../../../constants/url';
import { renderMoney, removeVietnameseTones } from '../../../../constants/renderConvert';

function RenderProduct({ location }) {
  const dispatch = useDispatch();
  const [pagi, setPagi] = useState();
  const listProductSearch = useSelector((state) => state.manageProducts.list);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 8,
    createdAt: -1,
    price: 0,
  });

  function handleChangePagination(page, pageSize) {
    setFilter((prevFilter) => ({ ...prevFilter, page: page }));
  }

  const addToCardSame = (value) => {
    const dataSame = JSON.parse(localStorage.getItem('CARD_SAME')) ? JSON.parse(localStorage.getItem('CARD_SAME')) : [];
    const arr = dataSame.find((item) => item.name === value.name && item._id === value._id);
    if (arr) {
      console.log('Already have a product');
    } else {
      dataSame.push(value);
      localStorage.setItem('CARD_SAME', JSON.stringify(dataSame));
    }
  };

  useEffect(() => {
    dispatch(actProduct.actFetchProductsRequest(filter));
    dispatch(actProduct.actFetchProductPaginationSearchRequest(filter, setPagi));
  }, [filter]);

  useEffect(() => {
    setFilter((prevFilter) => ({ ...prevFilter, name: location.state }));
  }, [location.state]);
  return (
    <>
      <div className="breadcrumb_background">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 a-left">
              <p><a style={{ color: 'white' }} className="my-link hover-link">Trang chủ</a> &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Tìm kiếm sản phẩm</span></p>
            </div>
          </div>
        </div>
      </div>
      <div className="breadcrumb-product-detail">
        <div className="container">
          <div className="row search-box">
            <div className="page-search-title">
              <strong>Kết quả tìm kiếm:</strong>
            </div>
          </div>
          <div className="row">
            {
              listProductSearch.map((itemList, indexList) => {
                return (
                  <div key={indexList} className="col-xl-3 col-lg-3 col-6">
                    <div className="card-best-seller">
                      <Card
                        bordered={false}
                        style={{ width: 260, marginRight: '25px', marginBottom: '50px' }}
                        cover={
                          Array.isArray(itemList && itemList.imgProduct) &&
                          itemList.imgProduct.length > 0 &&
                          itemList.imgProduct.map((itemImg, indexImg) => {
                            if (indexImg === 0) {
                              return (
                                <div className="wrapper-2">
                                  <div className="big-image" style={{ height: '310px' }}>
                                    {
                                      itemList.priceSale !== 0 ?
                                        <div className="percent-reduction">-{Math.floor(100 - ((itemList.priceSale) / (itemList.price) * 100))}%</div>
                                        :
                                        ""
                                    }
                                    <img src={`${API.serverImg}/${itemImg.imgUrl}`} width="100%" height="100%" />
                                    <div className="info-T-shirt-all">
                                      <Link
                                        path={{
                                          // to: `product/${item.id}`,
                                          // id: item.id,
                                        }}
                                      >
                                        {/* <button onClick={() => showModal(item.id)}> */}
                                        <button>
                                          <i
                                            style={{ fontSize: "23px" }}
                                            className="fa fa-eye"
                                            aria-hidden="true"
                                          ></i>
                                        </button>
                                      </Link>
                                      <br />
                                      <Link
                                        to={{
                                          pathname: `${API.PRODUCT
                                            }/${itemList._id}/${removeVietnameseTones(itemList.name)}`,
                                        }}
                                      >
                                        <button onClick={() => addToCardSame(itemList)}>
                                          <i
                                            style={{ fontSize: "23px" }}
                                            className="fa fa-shopping-cart"
                                            aria-hidden="true"
                                          ></i>
                                        </button>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          })
                        }
                      >
                        <div className="card-best-seller-title">
                          <div className="best-seller-info">
                            <a>
                              <Link
                                style={{ color: 'black' }}
                                to={{
                                  pathname: `${API.PRODUCT}/${itemList._id}/${removeVietnameseTones(itemList.name)}`,
                                }}
                              >
                                {itemList.name}
                              </Link>
                            </a>
                          </div>
                          <div className="product-price-best-seller">
                            {
                              itemList.priceSale ?
                                <>
                                  <strong style={{ fontSize: '16px' }}>{renderMoney(itemList.priceSale)}</strong> &emsp;
                                  <strike>{renderMoney(itemList.price)}</strike>
                                </> :
                                <strong style={{ fontSize: '16px' }}>{renderMoney(itemList.price)}</strong>
                            }
                          </div>
                          <div className="select-img">
                            {
                              Array.isArray(itemList && itemList.imgProduct) &&
                              itemList.imgProduct.length > 0 &&
                              itemList.imgProduct.map((itemImg, indexImg) => {
                                if (indexImg < 4 && itemImg.imgUrl !== '') {
                                  return (
                                    <Image
                                      style={{ border: "1px solid #ffac4b" }}
                                      src={`${API.serverImg}/${itemImg.imgUrl}`}
                                      width="40px"
                                    />
                                  );
                                }
                              })
                            }
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
        <div className="pagination-search-product">
          <Pagination
            total={pagi}
            pageSize={filter.limit}
            current={filter.page}
            onChange={(page, pageSize) => handleChangePagination(page, pageSize)}
          />
        </div>
      </div>
    </>
  );
}

export default RenderProduct;