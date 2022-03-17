/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Col } from 'antd';
import Slider from "react-slick";
import { renderMoney, removeVietnameseTones } from '../../../constants/renderConvert';
import * as API from '../../../constants/url';
import { BrowserRouter as Link, NavLink } from "react-router-dom";

function ProductSeen(props) {
  const listProductSeen = JSON.parse(localStorage.getItem('CARD_SAME'));

  const settings = {
    cssEase: "linear",
    // autoplay: true,
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,

    nextArrow: false,
    prevArrow: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ marginBottom: '30px' }}>
            <strong>SẢN PHẨM ĐÃ XEM</strong>
          </div>
        </div>
      </div>
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <div className="slick-product-seen">
            <Slider {...settings}>
              {
                listProductSeen !== undefined && listProductSeen !== null &&
                  listProductSeen !== 0
                  ?
                  (
                    listProductSeen.map((item, index) => {
                      return (
                        <div key={index} className="img-card">
                          {
                            Array.isArray(item && item.imgProduct) && item.imgProduct.length > 0 &&
                            item.imgProduct.map((itemImg, indexImg) => {
                              if (indexImg === 0) {
                                return (
                                  <>
                                    <img
                                      className="img"
                                      src={`${API.serverImg}/${itemImg.imgUrl}`}
                                      width="100%" height="100%"
                                    />
                                  </>
                                );
                              }
                            })
                          }
                          <div className="card-body">
                            <div className="product-info">
                              <NavLink
                                style={{ color: 'black' }}
                                to={{
                                  pathname: `${API.PRODUCT}/${item._id}/${removeVietnameseTones(item.name)}`,
                                  id: item._id,
                                }}
                              >
                                <a>
                                  {item.name}
                                </a>
                              </NavLink>
                            </div>
                            <div className="product-price-seen">
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
                          </div>
                        </div>
                      );
                    })
                  )
                  :
                  ""
              }
            </Slider>
          </div>
        </Col>
        <Col span={2}></Col>
      </Row>
    </div>
  );
}

export default ProductSeen;
