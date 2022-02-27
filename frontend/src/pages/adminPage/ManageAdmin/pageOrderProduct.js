/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import { Button } from 'react-rainbow-components';
import { useDispatch, useSelector } from 'react-redux';
import TableOrders from '../../../components/ManageOrders/Table';
import * as actOrder from '../../../redux/actions/manageOrderListCart/actManageOrderListCart';
import * as actCity from '../../../redux/actions/manageCity/actManageCity';
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
function PageOrderProduct({ match }) {
  const dispatch = useDispatch();
  const [listOrder, setListOrder] = useState([]);
  const [city, setCity] = useState([]);
  const [loading, setLoading] = useState(undefined);
  const listColor = useSelector((state) => state.manageColor.list);
  const [count, setCount] = useState()

  function onDelete(id) {
    dispatch(actOrder.actDeleteOrderCartRequest(id));
    const index = listOrder.findIndex((x) => x._id === id);
    const newArrList = [...listOrder];
    newArrList.splice(index, 1);
    setListOrder([...newArrList]);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(actOrder.actFetchOderCartRequest(setListOrder));
      dispatch(actOrder.actFetchOderCartCountRequest(setCount));
      dispatch(actCity.actFetchCityRequest(setCity));
      dispatch(actColor.actFetchColorsRequest());
      setLoading(true);
    }, 1000);
  }, []);
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
            <div className="container-fluid mt-4">
              {/* <!-- Page Heading --> */}
              <div className="d-sm-flex align-items-center justify-content-between mb-4" />
              <div className="row">
                <div className="col-xl-12 col-lg-12">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold ">Danh sách đơn hàng</h6>
                      {/* <Button
                        // onClick={() => openForm()}
                        style={{ height: '40px' }}
                      >
                        <i className="fas fa-plus" />
                      </Button> */}
                    </div>
                  </div>
                  <TableOrders
                    listOrder={listOrder}
                    listColor={listColor}
                    city={city}
                    match={match}
                    count={count}
                    onDelete={onDelete}
                  />
                </div>
              </div>
            </div>
          )
      }
    </>
  );
}

export default PageOrderProduct;