/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { renderMoney, removeVietnameseTones } from '../../../../../constants/renderConvert';
import { BrowserRouter as NavLink, Link } from "react-router-dom";
import * as API from '../../../../../constants/url';

function NewArrivalFrist({ newArrTshirt }) {
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
    <>
      {
        newArrTshirt.map((itemFirst, indexNew) => {
          if (indexNew === 0) {
            return (
              <>
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
                            pathname: `${API.PRODUCT}/${itemFirst._id}/${removeVietnameseTones(itemFirst.name)}`,
                          }}
                        >
                          <button onClick={() => addToCardSame(itemFirst)}>
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
                      <Link
                        style={{ color: 'black', fontWeight: '500' }}
                        to={{
                          pathname: `${API.PRODUCT}/${itemFirst._id}/${removeVietnameseTones(itemFirst.name)}`,
                        }}
                      >
                        <a>
                          {itemFirst.name}
                        </a>
                      </Link>

                      <br />
                      <div className="product-price">
                        <strong>{renderMoney(itemFirst.price)}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          }
        })
      }
    </>
  );
}

export default NewArrivalFrist;
