/* eslint-disable react/jsx-pascal-case */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import * as URL from '../../../constants/url';
import * as actProduct from '../../../redux/actions/managerProducts/actManageProducts';
import { Tabs } from 'antd';
import ReactImageMagnify from 'react-image-magnify';
import * as API from '../../../constants/url';
import Slider from "react-slick";
import Control_Cart from './Control-Cart';
import Lottie from 'react-lottie';
import * as location from '../../../JSON/63274-loading-animation.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
const { TabPane } = Tabs;
function DetailProduct({ match }) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };
  const { id } = match.params;
  const dispatch = useDispatch();
  const [selectImg, setSelectImg] = useState();
  const productId = useSelector((state) => state.manageProducts.item);
  const [loading, setLoading] = useState(undefined);

  function renderImageBig(value) {
    if (selectImg !== undefined && selectImg !== null) {
      return (
        <>
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: 'photo',
                isFluidWidth: true,
                src: `${API.serverImg}/${selectImg.imgUrl}`,
                sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
              },
              largeImage: {
                src: `${API.serverImg}/${selectImg.imgUrl}`,
                width: 1400,
                height: 1800,
              },
              lensStyle: { background: 'rgba(0,0,0,.6)' },
              enlargedImageContainerStyle: {
                zIndex: "1"
              }
            }}
          />
        </>
      );
    } else {
      return (
        <>
          {
            value && Array.isArray(value) && value.length > 0 && value.map((itemImg, indexImg) => {
              if (indexImg === 0) {
                return (
                  <div key={indexImg}>
                    <ReactImageMagnify
                      {...{
                        smallImage: {
                          alt: 'photo',
                          isFluidWidth: true,
                          src: `${API.serverImg}/${itemImg.imgUrl}`,
                          sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                        },
                        largeImage: {
                          src: `${API.serverImg}/${itemImg.imgUrl}`,
                          width: 1400,
                          height: 1800,
                        },
                        lensStyle: { background: 'rgba(0,0,0,.6)' },
                        enlargedImageContainerStyle: {
                          zIndex: "1"
                        }
                      }}
                    />
                  </div>
                );
              }
            })
          }
        </>
      );
    }
  }

  function renderImageSmall(value) {
    return (
      value && Array.isArray(value) && value.length > 0 && value.map((item, index) => (
        <div>
          {
            item.imgUrl !== ''
              ?
              <img
                style={{ border: "1px solid #ffac4b", cursor: 'pointer', marginRight: '60px' }}
                src={`${API.serverImg}/${item.imgUrl}`}
                width="80px" height="100px"
                onClick={() => { setSelectImg(item) }}
              />
              :
              ''
          }
        </div>
      )))
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      dispatch(actProduct.actGetProductByIdRequest(id));
      setLoading(true);
    }, 1000);
  }, [id]);
  return (
    <>
      {
        !loading
          ?
          (
            <>
              <div className="breadcrumb_background">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 a-left">
                      <p><Link style={{ color: 'white' }} to={URL.HOME} className="my-link hover-link">Trang chủ</Link> &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>{productId && productId.name}</span></p>
                    </div>
                  </div>
                </div>
              </div>
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
              <div className="breadcrumb_background">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 a-left">
                      <p><Link style={{ color: 'white' }} to={URL.HOME} className="my-link hover-link">Trang chủ</Link> &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>{productId && productId.name}</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="breadcrumb-product-detail">
                <div className="container">
                  <div className="row">
                    <div style={{ textAlign: 'center' }} className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-7-fix details-pro">
                      {renderImageBig(productId && productId.imgProduct)} <br />
                      <Slider {...settings}>
                        {renderImageSmall(productId && productId.imgProduct)}
                      </Slider>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-7-fix details-pro">
                      <Control_Cart productId={productId} />
                    </div>
                  </div>
                </div>
                <div className="product-info-item">
                  <div className="container">
                    <Tabs defaultActiveKey="1" centered>
                      <TabPane tab="Thông tin sản phẩm" key="1">
                        {/* <div className="thongtinimage">
                  {
                    Array.isArray(itemDetail && itemDetail.img) && itemDetail.img.length > 0 &&
                    itemDetail.img.map((item, index) => {
                      if (item) {
                        return (
                          <Image src={item} key={index} width="100%" />
                        )
                      }
                    })
                  }
                </div> */}
                      </TabPane>
                      <TabPane tab="Bản size" key="2">
                        {/* <div className="thongtinSize">
                  <img src="//bizweb.dktcdn.net/100/331/067/files/bang-size-yg-shop.png?v=1614019987979" width="100%" />
                </div> */}
                      </TabPane>
                      <TabPane tab="Đánh giá sản phẩm" key="3">
                        {/* <div className="thongtinSize">
                  <CommentHere itemDetail={itemDetail} />
                </div> */}
                      </TabPane>
                    </Tabs>
                  </div>
                </div>
              </div>
              <div style={{ height: '1000px' }}></div>
            </>
          )
      }
    </>
  );
}

export default DetailProduct;