/* eslint-disable no-redeclare */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actOrder from '../../redux/actions/manageOrderListCart/actManageOrderListCart';
import * as actGetProduct from '../../redux/actions/managerProducts/actManageProducts';
import { Steps, Alert } from 'antd';
import { Button } from 'react-rainbow-components';
import * as Message from '../../constants/Message';
import { manageAlertError } from '../../constants/Alert';

const { Step } = Steps;
function DetailOrders({ match, history }) {
  const { id } = match.params;
  const dispatch = useDispatch();
  const [initialValue, setInitialValue] = useState({});
  const listProduct = useSelector((state) => state.manageProducts.list);

  function handleChangeCurrentOrder(current) {
    const newValue = {
      ...initialValue,
      current_order: current,
    }
    if (current === 1) {
      Array.isArray(initialValue.oderListCart) && initialValue.oderListCart.length > 0
        && initialValue.oderListCart.map((itemOrder, indexOrder) => {
          listProduct.find((itemList, indexList) => {
            if (itemList._id === itemOrder._id) {
              itemList.sizeAndColorAndNumber.map((itemFilter, indexFilter) => {
                if (itemFilter.colorProductId === itemOrder.colorProductId && itemFilter.size === itemOrder.size) {
                  if (itemList.sizeAndColorAndNumber[indexFilter].howNumber === 0) {
                    manageAlertError(Message.CAP_NHAT_KHO_THAT_BAI, `Tên sản phẩm: ${itemList.name}`)
                  } else {
                    itemList.sizeAndColorAndNumber[indexFilter].howNumber = itemFilter.howNumber - itemOrder.quantily;
                    listProduct[indexFilter] = itemList;
                    const form_data = new FormData();
                    form_data.append('name', itemList.name.trim());
                    form_data.append('categoryId', itemList.categoryId);
                    form_data.append('description', itemList.description.trim());
                    form_data.append('price', itemList.price);
                    form_data.append('priceSale', itemList.priceSale);
                    form_data.append('typeProductId', itemList.typeProductId);
                    form_data.append('productCode', itemList.productCode);
                    form_data.append('bestSeller', itemList.bestSeller);
                    form_data.append('dealHot', itemList.dealHot);
                    if (itemList.sizeAndColorAndNumber.length > 0) {
                      for (var i = 0; i < itemList.sizeAndColorAndNumber.length; i++) {
                        var myItemInArr = itemList.sizeAndColorAndNumber[i];
                        for (var prop in myItemInArr) {
                          form_data.append(`sizeAndColorAndNumber[${i}][${prop}]`, myItemInArr[prop]);
                        }
                      }
                    }
                    if (itemList.imgProduct.length > 0) {
                      for (var i = 0; i < itemList.imgProduct.length; i++) {
                        var arrImg = itemList.imgProduct[i];
                        for (var prop in arrImg) {
                          form_data.append(`imgProduct[${i}][${prop}]`, arrImg[prop]);
                        }
                      }
                    }
                    // console.log(Object.fromEntries(form_data));
                    dispatch(actGetProduct.actUpdateProductRequest(form_data, itemList._id))
                    dispatch(actOrder.actUpdateOrderProductRequest(newValue, newValue._id, setInitialValue));
                  }
                }
              });
            }
          });
        });
    }
  }

  function goBack() {
    history.goBack();
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(actOrder.actGetOrderCartByIdRequest(id, setInitialValue));
    dispatch(actGetProduct.actFetchProductsRequest());
  }, [id]);
  return (
    <div className="container-fluid all-detail">
      <div className="d-sm-flex align-items-center justify-content-between mb-4 title-detail-admin">
        <h5 className="mb-0 text-gray-800" style={{ fontWeight: '600' }}>
          Mã hoá đơn: {initialValue.code_oders} / Tên: {initialValue.name} / Phone: {initialValue.phoneNumber}
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
      <div className="background-detail-custom transport-fee-admin-detail">
        <div className="space-detail"></div>
        <div className="step-transport-free">
          <Steps current={initialValue.current_order} onChange={handleChangeCurrentOrder}>
            <Step disabled title="Đơn Hàng Đã Đặt" icon={<i className="fas fa-list-alt"></i>} />
            {
              initialValue.current_order === 0
                ?
                <Step title="Đóng Gói & Cập Nhật Kho" icon={<i className="fas fa-box-open"></i>} />
                :
                <Step disabled title="Đóng Gói & Cập Nhật Kho" icon={<i className="fas fa-box-open"></i>} />
            }
            {
              initialValue.current_order === 1
                ?
                <Step title="Đang Giao" icon={<i className="fas fa-shipping-fast"></i>} />
                :
                <Step disabled title="Đang Giao" icon={<i className="fas fa-shipping-fast"></i>} />
            }
            {
              initialValue.current_order === 2
                ?
                <Step title="Đã Giao Xong" icon={<i className="fas fa-clipboard-check"></i>} />
                :
                <Step disabled title="Đã Giao Xong" icon={<i className="fas fa-clipboard-check"></i>} />
            }
          </Steps>
        </div>
        <div className="space-detail"></div>
      </div>
    </div >
  );
}

export default DetailOrders;
