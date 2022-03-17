/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-rainbow-components';
import { useDispatch, useSelector } from 'react-redux';
import * as actCity from '.././../../redux/actions/manageCity/actManageCity';
import axios from 'axios';

function PageCity() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actCity.actFetchCityRequest());
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
                <h6 className="m-0 font-weight-bold ">Danh sách Tỉnh, Thành phố</h6>
                <Button
                  // onClick={() => openForm()}
                  style={{ height: '40px' }}
                >
                  <i className="fas fa-plus" />
                </Button>
              </div>
            </div>
            Đây là trang quản lý thành phố, tỉnh
          </div>
        </div>
      </div>
    </>
  );
}

export default PageCity;
