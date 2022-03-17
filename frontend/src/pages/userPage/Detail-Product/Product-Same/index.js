/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Image } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actProduct from '../../../../redux/actions/managerProducts/actManageProducts';
import * as API from '../../../../constants/url';
import { BrowserRouter as NavLink, Link } from "react-router-dom";
import { renderMoney, removeVietnameseTones } from '../../../../constants/renderConvert';

function ProductSame({ productId }) {
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.manageProducts.list);

  function renderProductSame() {
    return listProduct.filter(item => item.categoryId === productId.categoryId && item.typeProductId === productId.typeProductId &&
      item._id !== productId._id) ?
      listProduct.filter(item => item.categoryId === productId.categoryId && item.typeProductId === productId.typeProductId &&
        item._id !== productId._id).map((item, index) => {
          if (index < 4) {
            return (
              <>
                <div className="col-xl-3 col-lg-3 col-6">
                  <div className="card-best-seller">
                    <Card
                      bordered={false}
                      style={{ width: 260, marginRight: '25px', marginBottom: '50px' }}
                      cover={
                        Array.isArray(item && item.imgProduct) && item.imgProduct.length > 0 &&
                        item.imgProduct.map((itemImg, indexImg) => {
                          if (indexImg === 0) {
                            return (
                              <div className="wrapper-2">
                                <div className="big-image" style={{ height: '310px' }}>
                                  {
                                    item.priceSale !== 0 ?
                                      <div className="percent-reduction">-{Math.floor(100 - ((item.priceSale) / (item.price) * 100))}%</div>
                                      : ""
                                  }
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
                                      {/* <button onClick={() => addToCardSame(item)}> */}
                                      <button>
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
                          };
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
                          {
                            item.priceSale ?
                              <>
                                <strong style={{ fontSize: '16px' }}>{renderMoney(item.priceSale)}</strong> &emsp;
                                <strike>{renderMoney(item.price)}</strike>
                              </>
                              :
                              <strong style={{ fontSize: '16px' }}>{renderMoney(item.price)}</strong>
                          }
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
              </>
            );
          };
        })
      :
      ''
  }

  useEffect(() => {
    const filter = {
      categoryId: productId.categoryId,
      typeProductId: productId.typeProductId,
      page: 1,
      limit: 10,
      createdAt: -1,
    };
    dispatch(actProduct.actFetchProductsRequest(filter));
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ marginBottom: '30px' }}>
            <strong>SẢN PHẨM TƯƠNG TỰ</strong>
          </div>
        </div>
        <div className="row">
          {renderProductSame()}
        </div>
      </div>
    </>
  );
}

export default ProductSame;
