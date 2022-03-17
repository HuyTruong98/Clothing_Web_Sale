/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-rainbow-components';
import { useDispatch } from 'react-redux';
import ModalCodeSale from '../../../components/ManageCodeSale/Modal';
import TableCodeSale from '../../../components/ManageCodeSale/Table';
import * as actCodeSale from '../../../redux/actions/manageCodeSale/actManageCodeSale';

function PageCodeSale(props) {
  const dispatch = useDispatch();
  const [listCodeSale, setListCodeSale] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [initialValue, setInitialValue] = useState({});
  const [codeSaleObject, setCodeSaleObject] = useState();
  const [page, setPage] = useState();
  const [filter, setFilter] = useState({
    limit: 6,
    page: 1,
  });

  function onEdit(id) {
    setCurrentId(id);
    dispatch(actCodeSale.actGetcodeSaleByIdRequest(id, setInitialValue));
    setOpenModal(true);
  }

  function onSave(value) {
    if (currentId) {
      const newValue = {
        ...value,
        _id: currentId,
        code: value.code.toUpperCase(),
      };
      dispatch(actCodeSale.actUpdateCodeSaleRequest(currentId, newValue, setCodeSaleObject))
    } else {
      const newValue = {
        ...value,
        code: value.code.toUpperCase(),
      };
      dispatch(actCodeSale.actCreateCodeSaleRequest(newValue));
      setFilter((filter) => ({ ...filter, page: 1 }));
    }
    cancel();
  }

  function onDelete(id) {
    dispatch(actCodeSale.actDeleteCodeSaleRequest(id));
    const index = listCodeSale.findIndex((x) => x._id === id);
    const newArrList = [...listCodeSale];
    newArrList.splice(index, 1);
    setListCodeSale([...newArrList]);
  }

  function cancel() {
    setOpenModal(false);
    setInitialValue(null);
    setCurrentId(null);
  }

  function openForm() {
    setOpenModal(true);
  }

  useEffect(() => {
    const index = listCodeSale.findIndex((x) => x._id === codeSaleObject._id);
    const newArrList = [...listCodeSale];
    newArrList[index] = codeSaleObject;
    setListCodeSale(newArrList);
  }, [codeSaleObject]);

  useEffect(() => {
    dispatch(actCodeSale.actFetchCodeSaleRequest(filter, setListCodeSale));
    dispatch(actCodeSale.actFetchPaginationCodeSaleRequest(filter, setPage));
  }, [filter]);
  return (
    <div className="container-fluid mt-4">
      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4" />
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold ">Danh sách Code Sale</h6>
              <Button
                onClick={() => openForm()}
                style={{ height: '40px' }}
              >
                <i className="fas fa-plus" />
              </Button>
            </div>
          </div>
          <ModalCodeSale
            isVisible={openModal}
            handleCancel={() => cancel()}
            onSave={onSave}
            initialValue={initialValue}
          />
          <TableCodeSale
            listCodeSale={listCodeSale}
            onEdit={onEdit}
            page={page}
            filter={filter}
            setFilter={setFilter}
            onDelete={onDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default PageCodeSale;
