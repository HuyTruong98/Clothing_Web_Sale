/* eslint-disable no-redeclare */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-cond-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { Button } from 'react-rainbow-components';
import { useDispatch, useSelector } from 'react-redux';
import ModalProduct from '../../../components/ManageProducts/Modal';
import TableProducts from '../../../components/ManageProducts/Table';
import * as actProduct from '../../../redux/actions/managerProducts/actManageProducts';
import * as actColor from '../../../redux/actions/manageColor/actManageColor';
import Lottie from 'react-lottie';
import * as location from '../../../JSON/82611-done.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

function ProductsItem({ match }) {
  const listProduct = useSelector((state) => state.manageProducts.list);
  const listColor = useSelector((state) => state.manageColor.list);
  const listType = useSelector((state) => state.manageTypes.list);
  const listCategory = useSelector((state) => state.manageCategory.list);
  const [arrImgProductObject, setArrImgProductObject] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [file, setFile] = useState([]);
  const [countDate, setCountDate] = useState('');
  const [bestSeller, setBestSeller] = useState('');
  const [filter, setFilter] = useState({
    page: 1,
    limit: 5,
    createdAt: -1,
    price: 0,
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(undefined);

  const handleGetNameFile = (e, indexImg) => {
    let temp = [...arrImgProductObject];
    temp.map((item, index) => {
      if (indexImg === index) {
        temp[indexImg] = { ...temp[index], imgUrl: e.file.originFileObj }
      }
    });
    setArrImgProductObject([...temp]);
  }

  function onSave(value) {
    if (currentId) {
      const dataUpdate = { ...value, _id: currentId, imgProduct: arrImgProductObject, dealHot: countDate, bestSeller: bestSeller };
      const form_data = new FormData();
      form_data.append('name', dataUpdate.name.trim());
      form_data.append('categoryId', dataUpdate.categoryId);
      form_data.append('description', dataUpdate.description.trim());
      form_data.append('price', dataUpdate.price);
      form_data.append('priceSale', dataUpdate.priceSale);
      form_data.append('typeProductId', dataUpdate.typeProductId);
      form_data.append('productCode', dataUpdate.productCode);
      form_data.append('bestSeller', dataUpdate.bestSeller);
      form_data.append('dealHot', dataUpdate.dealHot);
      if (arrImgProductObject) {
        arrImgProductObject.filter((itemFile) => {
          if (itemFile.imgUrl?.type === 'image/jpeg' || itemFile.imgUrl?.type === 'image/jpg' || itemFile.imgUrl?.type === 'image/png') {
            form_data.append('imgUrl', itemFile.imgUrl);
          } else {
            form_data.append('imgUrl', itemFile.imgUrl);
          }
        });
      }
      let temp = [...dataUpdate.imgProduct];
      temp.map((itemFile, indexFile) => {
        if (itemFile.imgUrl?.type === 'image/jpeg' || itemFile.imgUrl?.type === 'image/jpg' || itemFile.imgUrl?.type === 'image/png') {
          temp[indexFile] = { ...itemFile, imgUrl: itemFile.imgUrl.name }
        }
      });
      if (temp.length > 0) {
        for (var i = 0; i < temp.length; i++) {
          var arrImg = temp[i];
          for (var prop in arrImg) {
            form_data.append(`imgProduct[${i}][${prop}]`, arrImg[prop]);
          }
        }
      }
      if (dataUpdate.sizeAndColorAndNumber.length > 0) {
        for (var i = 0; i < dataUpdate.sizeAndColorAndNumber.length; i++) {
          var myItemInArr = dataUpdate.sizeAndColorAndNumber[i];
          for (var prop in myItemInArr) {
            form_data.append(`sizeAndColorAndNumber[${i}][${prop}]`, myItemInArr[prop]);
          }
        }
      }
      // console.log(Object.fromEntries(form_data));
      dispatch(actProduct.actUpdateProductRequest(form_data, dataUpdate._id));
    } else {
      const form_data = new FormData();
      form_data.append('name', value.name.trim());
      form_data.append('categoryId', value.categoryId);
      form_data.append('description', value.description.trim());
      form_data.append('price', value.price);
      form_data.append('priceSale', value.priceSale);
      form_data.append('typeProductId', value.typeProductId);
      form_data.append('bestSeller', bestSeller);
      if (value.imgUrl.fileList.length > 0) {
        value.imgUrl.fileList.map((item) => {
          form_data.append('imgUrl', item.originFileObj);
        });
      }
      if (value.sizeAndColorAndNumber.length > 0) {
        for (var i = 0; i < value.sizeAndColorAndNumber.length; i++) {
          var myItemInArr = value.sizeAndColorAndNumber[i];
          for (var prop in myItemInArr) {
            form_data.append(`sizeAndColorAndNumber[${i}][${prop}]`, myItemInArr[prop]);
          }
        }
      }
      setFilter((filter) => ({ ...filter, page: 1 }));
      dispatch(actProduct.actCreateProductRequest(form_data));
    }
    cancel();
  }

  function onEdit(id) {
    setCurrentId(id);
    dispatch(actProduct.actGetProductByIdRequest(id));
    setOpenModal(true);
  }

  function onDelete(id) {
    dispatch(actProduct.actDeleteProductRequest(id));
  }

  function cancel() {
    setFile([]);
    setOpenModal(false);
    setArrImgProductObject([]);
    resetForm();
    setCountDate('');
    setBestSeller('');
  }

  function resetForm() {
    dispatch(actProduct.actGetProductById(null));
  }

  function openForm() {
    resetForm();
    setOpenModal(true);
    setCurrentId(null);
    setFile([]);
    setBestSeller('');
  }

  useEffect(() => {
    if (filter.page === 1) {
      setTimeout(() => {
        dispatch(actProduct.actFetchProductsRequest(filter));
        dispatch(actProduct.actFetchPaginationProductRequest());
        dispatch(actColor.actFetchColorsRequest());
        setLoading(true);
      }, 1000);
    } else {
      dispatch(actProduct.actFetchProductsRequest(filter));
      dispatch(actProduct.actFetchPaginationProductRequest());
      dispatch(actColor.actFetchColorsRequest());
      setLoading(true);
    }
  }, [filter, openModal]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {
        !loading ?
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
            <div className="container-fluid mt-4">
              <div className="d-sm-flex align-items-center justify-content-between mb-4" />
              <div className="row">
                <div className="col-xl-12 col-lg-12">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold ">Danh sách Sản Phẩm</h6>
                      <Button
                        onClick={() => openForm()}
                        style={{ height: '40px' }}
                      >
                        <i className="fas fa-plus" />
                      </Button>
                    </div>
                  </div>
                  <ModalProduct
                    isVisible={openModal}
                    handleCancel={() => cancel()}
                    onSave={onSave}
                    listType={listType}
                    listCategory={listCategory}
                    listColor={listColor}
                    file={file}
                    setFile={setFile}
                    getNameFile={handleGetNameFile}
                    setArrImgProductObject={setArrImgProductObject}
                    arrImgProductObject={arrImgProductObject}
                    setCountDate={setCountDate}
                    setBestSeller={setBestSeller}
                  />
                  <TableProducts
                    listProduct={listProduct}
                    listType={listType}
                    listCategory={listCategory}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    setFilter={setFilter}
                    filter={filter}
                    match={match}
                    listColor={listColor}
                  />
                </div>
              </div>
            </div>
          )
      }
    </>
  );
}

export default ProductsItem;