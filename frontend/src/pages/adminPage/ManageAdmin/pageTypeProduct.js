import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TableType from '../../../components/ManageType/Table';
import { Button } from 'react-rainbow-components';
import ModalFormType from '../../../components/ManageType/Modal';
import * as actTypes from '../../../redux/actions/manageType/actManageType';

export default function PageTypeProduct(props) {
  const listTypes = useSelector((state) => state.manageTypes.list);
  const listCategory = useSelector((state) => state.manageCategory.list);
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  function onSave(value) {
    if (currentId) {
      const newValue = { ...value, _id: currentId };
      dispatch(actTypes.actUpdateTypeRequest(newValue));
    } else {
      dispatch(actTypes.actCreateTypeRequest(value));
    }
    cancel();
  }

  function onEdit(id) {
    setCurrentId(id);
    dispatch(actTypes.actGetTypeByIdRequest(id));
    setOpenModal(true);
  }

  function cancel() {
    setOpenModal(false);
  }

  function onDelete(id) {
    dispatch(actTypes.actDeleteTypeRequest(id));
  }

  function resetForm() {
    dispatch(actTypes.actGetTypeById(null));
  }

  function openForm() {
    resetForm();
    setOpenModal(true);
    setCurrentId(null);
  }

  return (
    <>
      <div className="container-fluid mt-4">
        {/* <!-- Page Heading --> */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4" />
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold ">Danh sách Type</h6>
                <Button
                  onClick={() => openForm()}
                  style={{ height: '40px' }}
                >
                  <i className="fas fa-plus" />
                </Button>
              </div>
            </div>
            <ModalFormType
              isVisible={openModal}
              handleCancel={() => cancel()}
              onSave={onSave}
              listCategory={listCategory}
            />
            <TableType
              listTypes={listTypes}
              listCategory={listCategory}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </div>
        </div>
      </div>
    </>
  );
}
