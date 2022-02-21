/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getRemainingTimeUntilMsTimestamp } from './Utils/CountdownTimerUtils';
import { renderMoney } from '../../../constants/renderConvert';
import { BrowserRouter as NavLink, Link } from "react-router-dom";
import { Button, Skeleton } from 'antd';
import * as API from '../../../constants/url';

function DealHot({ countdownTimestampMS, listProduct }) {
  const newArr = listProduct.filter((item) => item.dealHot !== '').map((itemCount, indexCount) => indexCount === 1 ? itemCount : '');
  const dayDown = newArr.findIndex((item) => item !== '');
  const hotDealItem = dayDown !== -1 ? newArr[dayDown] : '';
  // console.log(hotDealItem === '');
  const defaulRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00',
  }
  const [remainingTime, setRemainingTime] = useState(defaulRemainingTime);

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampMS);
    }, 1000);
    return () => clearTimeout(intervalId);
  }, [countdownTimestampMS]);
  return (
    <>
      {
        hotDealItem === ''
          ?
          (
            <>
              <div className="card-hot-deal">
                <div className="card-hot-deal-card">
                  <div className="card-hot-deal-title">
                    <Skeleton active paragraph={{ rows: 5 }} />
                  </div>
                  <div className="card-hot-deal-img-skeleton">
                    <Skeleton.Image />
                  </div>
                </div>
              </div>
            </>
          )
          :
          (
            <>
              <div className="card-hot-deal">
                <div className="card-hot-deal-card">
                  <div className="card-hot-deal-title">
                    <h5>{hotDealItem.name}</h5>
                    <div>
                      {
                        remainingTime.seconds === '00' && remainingTime.minutes === '00' && remainingTime.hours === '00' && remainingTime.days === '00'
                          ?
                          (
                            <div className="product-price-deal-hot">
                              <strong>{renderMoney(hotDealItem.price)}</strong>
                            </div>
                          )
                          :
                          (
                            <div className="product-price-deal-hot">
                              <strong>{renderMoney(hotDealItem.priceSale)}</strong> &emsp;
                              <strike>{renderMoney(hotDealItem.price)}</strike>
                            </div>
                          )
                      }
                    </div>
                    <div style={{ paddingTop: '6px' }}>
                      {
                        remainingTime.seconds === '00' && remainingTime.minutes === '00' && remainingTime.hours === '00' && remainingTime.days === '00'
                          ?
                          (
                            <>
                              <section className="timer-container">
                                <section className="timer">
                                  <span className="mdi mdi-calnedar-clock timer-icon"></span>
                                  <h6>Thời gian còn lại</h6>
                                </section>
                              </section>
                            </>
                          )
                          :
                          (
                            <>
                              <section className="timer-container">
                                <section className="timer">
                                  <div>
                                    <span className="mdi mdi-calnedar-clock timer-icon"></span>
                                    <h6>Thời gian còn lại</h6>
                                  </div>
                                  <div>
                                    <section>
                                      <strong>{remainingTime.days}</strong>
                                      <p>
                                        <smal>Ngày</smal>
                                      </p>
                                    </section>
                                    <span></span>
                                    <section>
                                      <strong>{remainingTime.hours}</strong>
                                      <p>
                                        <smal>Giờ</smal>
                                      </p>
                                    </section>
                                    <span></span>
                                    <section>
                                      <strong>{remainingTime.minutes}</strong>
                                      <p>
                                        <smal>Phút</smal>
                                      </p>
                                    </section>
                                    <span></span>
                                    <section>
                                      <strong>{remainingTime.seconds}</strong>
                                      <p>
                                        <smal>Giây</smal>
                                      </p>
                                    </section>
                                  </div>
                                </section>
                              </section>
                            </>
                          )
                      }
                    </div>
                    <div className="card-hot-deal-giohang">
                      <Link
                        to={{
                          pathname: `San-pham/${hotDealItem._id}`,
                        }}
                      >
                        <Button style={{ height: "50px", border: '2px solid #ebebeb', width: '220px' }}>
                          <i
                            style={{ fontSize: "30px" }}
                            className="fa fa-shopping-cart"
                            aria-hidden="true"
                          ></i>{" "}
                          <strong style={{ paddingLeft: "20px", fontSize: "18px" }}>
                            MUA NGAY
                          </strong>
                        </Button>
                      </Link>

                    </div>
                  </div>
                  <div className="card-hot-deal-img">
                    <div className="card-hot-deal-img-1">
                      {Array.isArray(hotDealItem && hotDealItem.imgProduct) &&
                        hotDealItem.imgProduct.length > 0 &&
                        hotDealItem.imgProduct.map((item, index) => {
                          if (index === 0) {
                            return <Link to={{
                              pathname: `San-pham/${hotDealItem._id}`,
                            }}><img src={`${API.serverImg}/${item.imgUrl}`} width="90%" height="100%" /></Link>;
                          }
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
      }
    </>
  );
}

export default DealHot;
