/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-rainbow-components';
import { useDispatch, useSelector } from 'react-redux';
import TableSlider from '../../../components/ManageSlider/Table';
import * as actSliders from '../../../redux/actions/manageSlider/actManageSlider';
import ModalSlider from '../../../components/ManageSlider/Modal';

function PageCarousel() {
  const dispatch = useDispatch();
  const listSliders = useSelector((state) => state.manageSliders.list);
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [file, setFile] = useState([]);
  const [arrImgProductObject, setArrImgProductObject] = useState({});

  const handleGetNameFile = (e) => {
    if (arrImgProductObject) {
      arrImgProductObject.imgSlider = e.originFileObj;
    }
  };

  function onSave(value) {
    if (currentId) {
      const dataUpdate = { ...value, _id: currentId, imgSlider: arrImgProductObject.imgSlider };
      const form_data = new FormData();
      form_data.append('imgSlider', dataUpdate.imgSlider);
      dispatch(actSliders.actUpdateSliderRequest(form_data, dataUpdate._id));
    } else {
      const form_data = new FormData();
      form_data.append('imgSlider', value.imgSlider.file);
      dispatch(actSliders.actCreateSlidersRequest(form_data));
    }
    cancel();
  }

  function onEdit(id) {
    setCurrentId(id);
    dispatch(actSliders.actGetSliderByIdRequest(id));
    setOpenModal(true);
  }

  function onDelete(id) {
    dispatch(actSliders.actDeleteSliderRequest(id));
  }

  function resetForm() {
    dispatch(actSliders.actGetSliderById(null));
  }

  function cancel() {
    setOpenModal(false);
    setFile([]);
    resetForm();
    setArrImgProductObject(null);
  }

  function openForm() {
    setOpenModal(true);
    setFile([]);
    resetForm();
    setCurrentId(null);
  }


  useEffect(() => {
    dispatch(actSliders.actFetchSlidersRequest());
  }, []);

  return (
    <>
      <div className="container-fluid mt-4">
        {/* <!-- Page Heading --> */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4" />
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold ">Danh sách ảnh quảng cáo</h6>
                <Button
                  onClick={() => openForm()}
                  style={{ height: '40px' }}
                >
                  <i className="fas fa-plus" />
                </Button>
              </div>
            </div>
            <ModalSlider
              isVisible={openModal}
              handleCancel={() => cancel()}
              onSave={onSave}
              file={file}
              setFile={setFile}
              setArrImgProductObject={setArrImgProductObject}
              getNameFile={handleGetNameFile}
            />
            <TableSlider
              listSliders={listSliders}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PageCarousel;