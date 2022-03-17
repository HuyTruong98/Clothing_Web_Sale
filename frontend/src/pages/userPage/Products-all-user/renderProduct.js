/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
import React from 'react';
import { Row, Col, Modal, Card, Image, Button, Pagination } from 'antd';
import { renderMoney, removeVietnameseTones } from '../../../constants/renderConvert';
import SkeletonBestSeller from '../Best-Seller/SkeletonBestSeller';
import * as API from '../../../constants/url';
import { BrowserRouter as NavLink, Link } from "react-router-dom";

function RenderProduct({ listProduct, totalPage, filter, setFilter }) {
  function handleChangePagination(page, pageSize) {
    setFilter((filter) => ({ ...filter, page }));
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
  return (
    <>
      {
        listProduct.length === 0
          ?
          (
            <>
              <SkeletonBestSeller />
            </>
          )
          :
          (
            listProduct.map((itemProduct, indexProduct) => {
              return (
                <div key={indexProduct} className="col-xl-3 col-lg-3 col-6">
                  <div className="card-best-seller">
                    <Card
                      bordered={false}
                      style={{ width: 260, marginRight: '25px', marginBottom: '50px' }}
                      cover={
                        Array.isArray(itemProduct && itemProduct.imgProduct) &&
                        itemProduct.imgProduct.length > 0 &&
                        itemProduct.imgProduct.map((itemImg, indexImg) => {
                          if (indexImg === 0) {
                            return (
                              <div className="wrapper-2">
                                <div className="big-image" style={{ height: '310px' }}>
                                  {
                                    itemProduct.priceSale !== 0 ?
                                      <div className="percent-reduction">-{Math.floor(100 - ((itemProduct.priceSale) / (itemProduct.price) * 100))}%</div>
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
                                        pathname: `${API.PRODUCT}/${itemProduct._id}/${removeVietnameseTones(itemProduct.name)}`,
                                        // id: item.id,
                                      }}
                                    >
                                      <button onClick={() => addToCardSame(itemProduct)}>
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
                                pathname: `${API.PRODUCT}/${itemProduct._id}/${removeVietnameseTones(itemProduct.name)}`,
                              }}
                            >
                              {itemProduct.name}
                            </Link>
                          </a>
                        </div>
                        <div className="product-price-best-seller">
                          {
                            itemProduct.priceSale ?
                              <>
                                <strong style={{ fontSize: '16px' }}>{renderMoney(itemProduct.priceSale)}</strong> &emsp;
                                <strike>{renderMoney(itemProduct.price)}</strike>
                              </> :
                              <strong style={{ fontSize: '16px' }}>{renderMoney(itemProduct.price)}</strong>
                          }
                        </div>
                        <div className="select-img">
                          {
                            Array.isArray(itemProduct && itemProduct.imgProduct) &&
                            itemProduct.imgProduct.length > 0 &&
                            itemProduct.imgProduct.map((itemImg, indexImg) => {
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
          )
      }
      <div className="pagination-all-product">
        <Pagination
          total={totalPage}
          pageSize={filter.limit}
          current={filter.page}
          onChange={(page, pageSize) => handleChangePagination(page, pageSize)}
        />
      </div>
    </>
  );
}

export default RenderProduct;
