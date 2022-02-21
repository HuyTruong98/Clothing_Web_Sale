/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
import React from 'react';
import { renderMoney } from '../../../../../constants/renderConvert';
import { BrowserRouter as NavLink, Link } from "react-router-dom";
import * as API from '../../../../../constants/url';

function HoodieFirst({ newArrHoodie }) {
  return (
    <>
      {
        newArrHoodie.map((itemFirst, indexNew) => {
          if (indexNew === 0) {
            return (
              <div className="card-item-1">
                <div className="wrapper-1">
                  <div className="card-1">
                    {
                      Array.isArray(itemFirst && itemFirst.imgProduct) &&
                      itemFirst.imgProduct.length > 0 &&
                      itemFirst.imgProduct.map((item, index) => {
                        if (index === 0) {
                          return (
                            <img src={`${API.serverImg}/${item.imgUrl}`} width="100%" height="100%" />
                          );
                        }
                      })
                    }
                    <div className="info">
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
                          pathname: `San-pham/${itemFirst._id}`,
                        }}
                      >
                        {/* <button onClick={() => addToCardSame(item)}> */}
                        <button>
                          <i
                            style={{ fontSize: "28px" }}
                            className="fa fa-shopping-cart"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-price-name">
                  <div className="card-price-name">
                    <a>
                      <Link
                        style={{ color: 'black', fontWeight: '500' }}
                        to={{
                          pathname: `San-pham/${itemFirst._id}`,
                        }}
                      >
                        {itemFirst.name}
                      </Link>
                    </a>

                    <br />
                    <div className="product-price">
                      <strong>{renderMoney(itemFirst.price)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })
      }
    </>
  );
}

export default HoodieFirst;
