/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actColor from '../../../redux/actions/manageColor/actManageColor';
import TableColor from '../../../components/ManageColor/Table';
import { Button } from 'react-rainbow-components';
import ModalFormColor from '../../../components/ManageColor/Modal';

function PageColors() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const listColor = useSelector((state) => state.manageColor.list);

  function onSave(value) {
    if (currentId) {
      const newValue = { ...value, _id: currentId };
      dispatch(actColor.actUpdateColorRequest(newValue));
    } else {
      dispatch(actColor.actCreateColorRequest(value));
    }
    cancel();
  }

  function onEdit(id) {
    setCurrentId(id);
    dispatch(actColor.actGetColorByIdRequest(id));
    setOpenModal(true);
  }

  function onDelete(id) {
    dispatch(actColor.actDeleteColorRequest(id));
  }

  function resetForm() {
    dispatch(actColor.actGetColorById(null));
  }

  function openForm() {
    resetForm();
    setOpenModal(true);
  }

  function cancel() {
    setOpenModal(false);
  }

  useEffect(() => {
    dispatch(actColor.actFetchColorsRequest());
  }, []);
  return (
    <>
      <div className="container-fluid mt-4">
        <div className="d-sm-flex align-items-center justify-content-between mb-4" />
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold ">Danh sách Màu</h6>
                <Button
                  onClick={() => openForm()}
                  style={{ height: '40px' }}
                >
                  <i className="fas fa-plus" />
                </Button>
              </div>
            </div>
            <ModalFormColor
              isVisible={openModal}
              handleCancel={() => cancel()}
              onSave={onSave}
            />
            <TableColor
              listColor={listColor}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default PageColors;

