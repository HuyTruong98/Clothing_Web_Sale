/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Modal, Drawer, Space, Card, Image } from "antd";
import { renderMoney } from '../../../../../constants/renderConvert';
import { BrowserRouter as NavLink, Link } from "react-router-dom";
import * as API from '../../../../../constants/url';

function NewArrivalLast({ newArrTshirt }) {
  return (
    <>
      {
        newArrTshirt.map((itemLast, indexLast) => {
          if (indexLast < 5 && indexLast > 0) {
            return (
              <>
                <Space>
                  <div className="all-last-Tshirt">
                    <Card
                      style={{ width: 220 }}
                      bordered={false}
                      cover={
                        Array.isArray(itemLast && itemLast.imgProduct) &&
                        itemLast.imgProduct.length > 0 &&
                        itemLast.imgProduct.map((itemImg, indexImg) => {
                          if (indexImg === 0) {
                            return (
                              <div className="wrapper-2">
                                <div className="big-image">
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
                                          class="fa fa-eye"
                                          aria-hidden="true"
                                        ></i>
                                      </button>
                                    </Link>
                                    <br />
                                    <Link
                                      to={{
                                        pathname: `San-pham/${itemLast._id}`,
                                        id: itemLast._id,
                                      }}
                                    >
                                      {/* <button onClick={() => addToCardSame(item)}> */}
                                      <button>
                                        <i
                                          style={{ fontSize: "23px" }}
                                          class="fa fa-shopping-cart"
                                          aria-hidden="true"
                                        ></i>
                                      </button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                        })
                      }
                    >
                      <div className="card-product-list">
                        <div className="product-info">
                          <a>
                            <Link
                              style={{ color: 'black' }}
                              to={{
                                pathname: `San-pham/${itemLast._id}`,
                              }}
                            >
                              {itemLast.name}
                            </Link>
                          </a>
                        </div>
                        <div className="product-price">
                          <strong>{renderMoney(itemLast.price)}</strong>
                        </div>
                        <div className="select-img">
                          {
                            Array.isArray(itemLast && itemLast.imgProduct) &&
                            itemLast.imgProduct.length > 0 &&
                            itemLast.imgProduct.map((itemImg, indexImg) => {
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
                </Space>
              </>
            )
          }
        })
      }
    </>
  );
}

export default NewArrivalLast;
