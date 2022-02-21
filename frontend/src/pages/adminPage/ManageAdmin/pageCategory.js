import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableCategory from '../../../components/ManageCategory/Table';
import { Button } from 'react-rainbow-components';
import ModalFormCategory from '../../../components/ManageCategory/Modal';
import * as actCategories from '../../../redux/actions/manageCategory/actManageCategory';

function PageCategory(props) {
  const listCategory = useSelector((state) => state.manageCategory.list);
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  function onSave(value) {
    if (currentId) {
      const newValue = { ...value, _id: currentId }
      dispatch(actCategories.actUpdateCategoryRequest(newValue));
    } else {
      dispatch(actCategories.actCreateCategoryRequest(value));
    }
    cancel();
  }

  function onEdit(id) {
    setCurrentId(id);
    dispatch(actCategories.actGetCategoryByIdRequest(id));
    setOpenModal(true);
  }

  function resetForm() {
    dispatch(actCategories.actGetCategoryById(null));
  }

  function onDelete(id) {
    dispatch(actCategories.actDeleteCategoryRequest(id));
  }
  function cancel() {
    setOpenModal(false);
  }

  function openForm() {
    resetForm();
    setOpenModal(true);
    setCurrentId(null);
  }
  return (
    <div className="container-fluid mt-4">
      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4" />
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold ">Danh sách Categories</h6>
              <Button
                onClick={() => openForm()}
                style={{ height: '40px' }}
              >
                <i className="fas fa-plus" />
              </Button>
            </div>
          </div>
          <ModalFormCategory
            isVisible={openModal}
            handleCancel={() => cancel()}
            onSave={onSave}
          />
          <TableCategory
            listCategory={listCategory}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      </div>
    </div>
  );
}

export default PageCategory;
