/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import CarouselUserPage from './carousel-UserPage';
import DealHot1 from './count-down/DealHot-1';
import DealHot2 from './count-down/DealHot-2';
import SlickImageUser from './slick-Image-user';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import NewArrivalTshirt from './newArrival/Tshirt-NewArrival/NewArrival';
import NewArrivalHoodie from './newArrival/Hoodie-NewArrival/NewArrival';
import * as actFetchProducts from '../../redux/actions/managerProducts/actManageProducts';
import * as location from '../../JSON/63274-loading-animation.json';
import SkeletonNewArrival from './newArrival/Skeleton-NewArrival';
import BestSeller from './Best-Seller';
import Banner from './Banner';
import Lottie from 'react-lottie';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
const { TabPane } = Tabs;
function Home({ match }) {
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.manageProducts.list);
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(undefined);
  const [filter, setFilter] = useState({
    createdAt: -1,
    price: 0,
  });
  // hot deal 1
  const newArr1 = listProduct.filter((item) => item.dealHot !== '').map((itemCount, indexCount) => indexCount === 0 ? itemCount.dealHot : '');
  const dayDown1 = newArr1.findIndex((item) => item !== '');
  let countDown1 = dayDown1 !== -1 ? newArr1[dayDown1] : '';
  const moonLanding1 = new Date(countDown1);
  const countIndex1 = moonLanding1.getTime();
  // hot deal 2
  const newArr2 = listProduct.filter((item) => item.dealHot !== '').map((itemCount, indexCount) => indexCount === 1 ? itemCount.dealHot : '');
  const dayDown2 = newArr2.findIndex((item) => item !== '');
  let countDown2 = dayDown1 !== -1 ? newArr2[dayDown2] : '';
  const moonLanding2 = new Date(countDown2);
  const countIndex2 = moonLanding2.getTime();

  const newArrTshirt = [];
  listProduct.filter((item) => {
    if (item.categoryId === '61800c903202f218c8f921e0' && item.typeProductId === '61816c0b529ae973cc29e34b' && item.dealHot === '' && item.priceSale === 0) {
      newArrTshirt.push(item);
    }
  });

  const newArrHoodie = [];
  listProduct.filter((item) => {
    if (item.categoryId === '61800c903202f218c8f921e0' && item.typeProductId === '6186becdb2ad9e88fcf35613' && item.dealHot === '' && item.priceSale === 0) {
      newArrHoodie.push(item);
    }
  });

  function handleChange(activeKey) {
    if (activeKey) {
      setTimeout(() => {
        setLoading(true);
      }, 1000);
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      dispatch(actFetchProducts.actFetchProductsRequest(filter));
      setLoad(true);
    }, 1500);
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);
  return (
    <>
      {showButton && (
        <button onClick={scrollToTop} className="back-to-top">
          <div className="scroll-to-top-click">
            <ArrowUpOutlined style={{ fontSize: '45px', paddingTop: '5px' }} />
          </div>
        </button>
      )}
      {
        !load
          ?
          (
            <>
              <div className="spinner-show">
                <Lottie options={defaultOptions}
                  height={400}
                  width={400}
                />
              </div>
            </>
          )
          :
          (
            <>
              {/* Đây là trang Home user */}
              <div className="carousel-home">
                <CarouselUserPage />
                <div className="container">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-12 mt-5">
                      <SlickImageUser />
                    </div>
                  </div>
                </div>
                <div className="hot-deal">
                  <div className="hot-deal-title-1">
                    <img src="//bizweb.dktcdn.net/100/331/067/themes/823156/assets/i_title_flash.png?1624817220708" />{" "}
                    &ensp;
                    <strong>HOT DEAL</strong> <br />
                  </div>
                  <div className="hot-deal-title-2">
                    <p>Sản phẩm đang được khuyến mãi cực hot</p>
                  </div>
                  <div className="hot-deal-img-1">
                    <div className="container ">
                      <div className="row">
                        <div className="col-xl-12 col-lg-12 col-12">
                          <div className="site-card-wrapper">
                            <DealHot1 countdownTimestampMS={countIndex1} listProduct={listProduct} />
                            <DealHot2 countdownTimestampMS={countIndex2} listProduct={listProduct} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="new-arrival">
                  <div className="new-arrival-title">
                    <strong>NEW ARRIVAL</strong>
                  </div>
                  <div className="tab-new-arrival">
                    <div className="container">
                      <div className="row">
                        <div className="col-xl-12 col-lg-12 col-12">
                          <div className="tab-new-arrival-wrapper">
                            <Tabs defaultActiveKey="1" onChange={handleChange} centered>
                              <TabPane tab="T-SHIRT" key="1">
                                <NewArrivalTshirt match={match} newArrTshirt={newArrTshirt} />
                              </TabPane>
                              <TabPane tab="HOODIE" key="2">
                                {
                                  !loading
                                    ?
                                    (
                                      <>
                                        <SkeletonNewArrival />
                                      </>
                                    )
                                    :
                                    (
                                      <>
                                        <NewArrivalHoodie match={match} newArrHoodie={newArrHoodie} />
                                      </>
                                    )
                                }
                              </TabPane>
                              <TabPane tab="PHỤ KIỆN" key="3">
                                {/* <PhuKienNewArrival newArrival={newArrival} /> */}
                              </TabPane>
                            </Tabs>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="best-seller">
                  <div className="best-seller-title">
                    <strong>BEST SELLER</strong>
                    <div className="tab-best-seller">
                      <div className="container">
                        <div className="row">
                          <div className=" col-xl-12 col-lg-12">
                            <Tabs defaultActiveKey="2" centered>
                              <TabPane tab="SẢN PHẨM BÁN CHẠY" key="1">
                                <BestSeller listProduct={listProduct} />
                              </TabPane>
                            </Tabs>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section-video">
                  <Banner />
                </div>
                <div className="product-sale">
                  <div className="product-sale-title">
                    <strong>ĐANG GIẢM GIÁ</strong>
                    <div className="tab-product-sale">
                      <div className="container">
                        <div className="row">
                          <div className=" col-xl-12 col-lg-12">
                            <Tabs defaultActiveKey="2" centered>
                              <TabPane tab="GIẢM GIÁ" key="1">
                              </TabPane>
                            </Tabs>
                          </div>
                        </div>
                      </div>
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

export default Home;