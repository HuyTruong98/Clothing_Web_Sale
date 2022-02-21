/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Descriptions, Image, Badge } from 'antd';
import { Button } from 'react-rainbow-components';
import Lottie from 'react-lottie';
import * as location from '../../JSON/82611-done.json';
import * as actGetProductId from '../../redux/actions/managerProducts/actManageProducts';
import { renderMoney } from '../../constants/renderConvert';
import * as ApiImg from '../../constants/url';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
function DetailProduct({ match, history }) {
  const { id } = match.params;
  const dispatch = useDispatch();
  const initialValue = useSelector((state) => state.manageProducts.item);
  const listCategory = useSelector((state) => state.manageCategory.list);
  const listType = useSelector((state) => state.manageTypes.list);
  const [loading, setLoading] = useState(undefined);

  function goBack() {
    history.goBack();
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(actGetProductId.actGetProductByIdRequest(id));
      setLoading(true);
    }, 2000);
  }, [id]);
  return (
    <>
      {
        !loading
          ?
          (
            <div className="spinner-show">
              <Lottie options={defaultOptions}
                height={400}
                width={400}
              />
            </div>
          )
          :
          (
            <div className="container-fluid all-detail">
              <div className="d-sm-flex align-items-center justify-content-between mb-4 title-detail-admin">
                <h5 className="mb-0 text-gray-800" style={{ fontWeight: 'bold' }}>
                  {
                    initialValue?.bestSeller === ''
                      ?
                      (
                        <>
                        </>
                      )
                      :
                      (
                        <>
                          <img
                            src="https://png.pngtree.com/png-vector/20190828/ourlarge/pngtree-gold-label-best-seller-png-image_1701316.jpg"
                          />
                        </>
                      )
                  }
                  {
                    initialValue?.dealHot === ''
                      ?
                      (
                        <>
                          {initialValue?.name}
                        </>
                      )
                      :
                      (
                        <>
                          {initialValue?.name} 🔥 đến ngày {initialValue?.dealHot}
                        </>
                      )
                  }
                </h5>
                <Button
                  type='submit'
                  style={{ color: 'black' }}
                  onClick={() => {
                    goBack();
                  }}
                >
                  Quay lại
                </Button>
              </div>
              <div className="background-detail-custom shadow">
                <Descriptions size="middle" layout="horizontal" bordered>
                  <Descriptions.Item label="Tên sản phẩm" span={3}>
                    <Badge status="processing" text={`${initialValue && initialValue.name}`} />
                  </Descriptions.Item>
                  <Descriptions.Item label="Mã sản phẩm" span={3}>
                    {initialValue && initialValue.productCode}
                  </Descriptions.Item>
                  <Descriptions.Item label="Loại sản phẩm" span={3}>
                    {
                      listCategory && listCategory.filter((itemCate) => itemCate._id === initialValue?.categoryId).length > 0
                        ?
                        (
                          listCategory.filter((itemCate) => itemCate._id === initialValue?.categoryId).map((item) => {
                            return (
                              <>
                                {item.name}
                              </>
                            );
                          })
                        )
                        :
                        ''
                    }
                  </Descriptions.Item>
                  <Descriptions.Item label="Danh mục" span={3}>
                    {
                      listType && listType.filter((itemType) => itemType._id === initialValue?.typeProductId).length > 0
                        ?
                        (
                          listType.filter((itemType) => itemType._id === initialValue?.typeProductId).map((item) => {
                            return (
                              <>
                                {item.name}
                              </>
                            );
                          })
                        )
                        :
                        ''
                    }
                  </Descriptions.Item>
                  <Descriptions.Item label="Giá" span={3}>
                    {renderMoney(initialValue && initialValue.price)}
                  </Descriptions.Item>
                  {
                    initialValue && initialValue.priceSale === 0
                      ?
                      ''
                      :
                      (
                        <>
                          <Descriptions.Item label="Giá sale" span={3}>
                            {renderMoney(initialValue && initialValue.priceSale)}
                          </Descriptions.Item>
                        </>
                      )
                  }
                  <Descriptions.Item label="Mô tả" span={3}>
                    {initialValue && initialValue.description}
                  </Descriptions.Item>

                  {
                    initialValue && initialValue.imgProduct && initialValue.imgProduct.length > 0 &&
                    initialValue.imgProduct.map((itemImg, indexImg) => {
                      if (indexImg === 0) {
                        return (
                          <>
                            <Descriptions.Item label="Ảnh đại diện" span={3}>
                              <Image
                                style={{ width: '97px', paddingRight: '5px' }}
                                src={`${ApiImg.serverImg}/${itemImg.imgUrl}`}
                              />
                            </Descriptions.Item>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <Descriptions.Item label={`Ảnh slide ${indexImg}`} span={3}>
                              {
                                itemImg.imgUrl !== ''
                                  ?
                                  (
                                    <>
                                      <Image
                                        style={{ width: '97px', paddingRight: '5px' }}
                                        src={`${ApiImg.serverImg}/${itemImg.imgUrl}`}
                                      />
                                    </>
                                  )
                                  :
                                  (
                                    <>
                                      <img
                                        style={{ width: '75px', marginBottom: '10px', marginLeft: '0px' }}
                                        src={`${ApiImg.serverImg}/thaythe.png`}
                                      />
                                    </>
                                  )
                              }
                            </Descriptions.Item>
                          </>
                        );
                      }
                    })
                  }

                  <Descriptions.Item label="Sản phẩm hiện có">
                    {
                      initialValue && initialValue.sizeAndColorAndNumber && initialValue.sizeAndColorAndNumber.length > 0 &&
                      initialValue.sizeAndColorAndNumber.map((itemSize, indexSize) => {
                        return (
                          <div key={indexSize}>
                            Màu : {itemSize.color} &ensp;
                            Size : {itemSize.size} &ensp;
                            Số lượng: {itemSize.howNumber}
                          </div>
                        );
                      })
                    }
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          )
      }
    </>
  );
}

export default DetailProduct;
