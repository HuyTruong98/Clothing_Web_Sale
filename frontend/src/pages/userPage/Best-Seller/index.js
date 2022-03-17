/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import { Card, Image } from 'antd';
import React from 'react';
import SkeletonBestSeller from './SkeletonBestSeller';
import * as API from '../../../constants/url';
import { BrowserRouter as NavLink, Link } from "react-router-dom";
import { renderMoney, removeVietnameseTones } from '../../../constants/renderConvert';

function BestSeller({ listProduct }) {
  const newArr = [];
  listProduct.filter((itemBest, indexBest) => {
    if (itemBest.bestSeller) {
      newArr.push(itemBest);
    }
  });
  const addToCardSame = (value) => {
    const dataSame = JSON.parse(localStorage.getItem('CARD_SAME')) ? JSON.parse(localStorage.getItem('CARD_SAME')) : [];
    const arr = dataSame.find((item) => item.name === value.name && item._id === value._id);
    if (arr) {
      console.log('Already have a product');
    } else {
      dataSame.push(value);
      localStorage.setItem('CARD_SAME', JSON.stringify(dataSame));
    }
  }
  return (
    <div className="row">
      {
        newArr.length === 0
          ?
          (
            <>
              <div className="best-seller-card-all">
                <SkeletonBestSeller />
              </div>
            </>
          )
          :
          (
            <>
              {
                newArr.map((item, index) => {
                  if (index < 8) {
                    return (
                      <div className="row">
                        <div className="col-xl-3 col-lg-3 col-lg-6 col-lg-12">
                          <div className="card-best-seller">
                            <Card
                              bordered={false}
                              style={{ width: 260, marginRight: '25px', marginBottom: '50px' }}
                              cover={
                                Array.isArray(item && item.imgProduct) &&
                                item.imgProduct.length > 0 &&
                                item.imgProduct.map((itemImg, indexImg) => {
                                  if (indexImg === 0) {
                                    return (
                                      <div className="wrapper-2">
                                        <div className="big-image" style={{ height: '310px' }}>
                                          <img src={`${API.serverImg}/${itemImg.imgUrl}`} width="100%" height="100%" />
                                          <div class="info-T-shirt-all">
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
                                                pathname: `${API.PRODUCT}/${item._id}/${removeVietnameseTones(item.name)}`,
                                                // id: item.id,
                                              }}
                                            >
                                              <button onClick={() => addToCardSame(item)}>
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
                                        pathname: `${API.PRODUCT}/${item._id}/${removeVietnameseTones(item.name)}`,
                                      }}
                                    >
                                      {item.name}
                                    </Link>
                                  </a>
                                </div>
                                <div className="product-price-best-seller">
                                  <strong style={{ fontSize: '16px' }}>{renderMoney(item.price)}</strong>
                                </div>
                                <div className="select-img">
                                  {
                                    Array.isArray(item && item.imgProduct) &&
                                    item.imgProduct.length > 0 &&
                                    item.imgProduct.map((itemImg, indexImg) => {
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
                      </div>
                    );
                  }
                })
              }
            </>
          )
      }
    </div>
  );
}

export default BestSeller;
