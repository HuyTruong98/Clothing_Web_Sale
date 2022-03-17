/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { Avatar, Badge, Card } from 'antd';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Route, Switch, useHistory } from "react-router-dom";
import * as URL from '../../../constants/url';
import * as actOrder from '../../../redux/actions/manageOrderListCart/actManageOrderListCart';
import * as actLoginUser from '../../../redux/actions/manageUser/actManageUsers';
import routes from "../../../routers/adminRouter/routes";

function Nav({ account_current }) {
  const [listOrder, setListOrder] = useState([]);
  const refreshToken = JSON.parse(localStorage.getItem('token'))?.token;
  const dispatch = useDispatch();
  const history = useHistory();
  function renderContentMenu(routes) {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return result;
  }
  const logOut = () => {
    dispatch(actLoginUser.actLogOutUserRequest({ refreshToken: refreshToken }));
    dispatch(actLoginUser.actLogOut({ status: false }));
    localStorage.removeItem('token');
    history.push(URL.LOGIN);
  };

  useEffect(() => {
    dispatch(actOrder.actFetchOderCartRequest(setListOrder));
  }, []);
  return (
    <div id="content-wrapper" className="d-flex flex-column fix-height">
      {/* <!-- Main Content --> */}
      <div id="content">
        {/* <!-- Topbar --> */}
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          {/* <!-- Sidebar Toggle (Topbar) --> */}
          <button
            id="sidebarToggleTop"
            className="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i className="fa fa-bars"></i>
          </button>

          {/* <!-- Topbar Search --> */}
          <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          </form>

          {/* <!-- Topbar Navbar --> */}
          <ul className="navbar-nav ml-auto">
            {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
            <li className="nav-item dropdown no-arrow d-sm-none">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="searchDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-search" aria-hidden="true"></i>
              </a>
              {/* <!-- Dropdown - Messages --> */}
              <div
                className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                aria-labelledby="searchDropdown"
              >
                <form className="form-inline mr-auto w-100 navbar-search">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Tìm kiếm ....."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>

            <div className="topbar-divider d-none d-sm-block"></div>

            {/* <!-- Nav Item - User Information --> */}
            <li className="nav-item dropdown no-arrow" style={{ paddingTop: '8px', paddingRight: '10px' }}>
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                  {/* {account_current.tenDangNhap} */}
                </span>
                <Badge size="small" count={listOrder.length} showZero>
                  <i className="fas fa-bell" style={{ fontSize: '23px' }}></i>
                </Badge>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <Card size="small" title="Thông báo Orders" style={{ width: 250 }}>
                  <ul>
                    {listOrder.map((item, index) => (
                      <li key={index}>
                        <NavLink
                          to={`${URL.ODERS}/${item._id}/${item.code_oders}`}
                          style={{ color: 'black', fontSize: '14px' }}
                        >
                          {index + 1} / {item.name} <br />
                          {item.phoneNumber}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </li>
            <li className="nav-item dropdown no-arrow">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                  {/* {account_current.tenDangNhap} */}
                </span>
                {/* <img
                  className="img-profile rounded-circle"
                  src={account_current.img}
                /> */}
                <Avatar style={{ background: '#f56a00' }}>
                  {
                    account_current.user
                      ?
                      account_current.user.name.slice(0, 1)
                      :
                      account_current.name.slice(0, 1)
                  }
                </Avatar>
              </a>
              {/* <!-- Dropdown - User Information --> */}
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <a className="dropdown-item info-dropdown">
                  <i
                    className="fa fa-user-o mr-2 text-gray-400"
                    aria-hidden="true"
                  ></i>
                  Thông tin
                </a>
                {/* <a className="dropdown-item" href="#">
                  <i
                    className="fa fa-user-plus mr-2 text-gray-400"
                    aria-hidden="true"
                  ></i>
                  Thêm tài khoản
                </a> */}
                <div className="dropdown-divider"></div>
                <a
                  className="dropdown-item info-dropdown"
                  data-toggle="modal"
                  data-target="#logoutModal"
                  onClick={() => logOut()}
                >
                  <i
                    className="fa fa-sign-out  mr-2 text-gray-400"
                    aria-hidden="true"
                  ></i>
                  Đăng xuất
                </a>
              </div>
            </li>
            <li className="nav-item dropdown no-arrow">
              {/* <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div>
                  <Badge size="small" count={1}>
                    <i className="fas fa-bell"></i>
                  </Badge>
                </div>
              </a> */}
              {/* <!-- Dropdown - User Information --> */}
              {/* <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <Card size="small" title="Thông báo orders" style={{ width: 250 }}>
                  <ul>
                    {dataThongBaoOrder.map((item, index) => (
                      <li>
                        <Link
                          to={{
                            pathname: `/quanlyhoadon`,
                          }}
                          style={{ color: 'black', paddingLeft: '10px' }}
                        >
                          {item.fullName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div> */}
            </li>

            <div className="topbar-divider d-none d-sm-block"></div>
            {/* <li className="nav-item dropdown no-arrow"> */}
            {/* <span
                className="nav-link "
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                  <i class="fa fa-cogs" aria-hidden="true"></i>
                </span>
              </span> */}
            {/* <!-- Dropdown - User Information --> */}
            {/* <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <span className="dropdown-item ">
                  <SwitchCommon
                    onClick={onToogleMenu}
                    name={checkToogle ? "Mở menu" : "Đóng menu"}
                  />
                </span>
                <span className="dropdown-item">
                  <SwitchCommon
                    onClick={onSetColorMenu}
                    name={colorMenu ? "Menu tối" : "Menu sáng"}
                  />
                </span>
              </div> */}
            {/* </li> */}
          </ul>
        </nav>
        <Switch>{renderContentMenu(routes)}</Switch>
      </div>
    </div >
  );
}

export default Nav;
