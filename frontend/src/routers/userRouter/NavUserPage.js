/* eslint-disable array-callback-return */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Dropdown, Badge, Avatar, Input } from 'antd';
import { Button } from 'react-rainbow-components';
import { SearchOutlined, ShoppingCartOutlined, DownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Route, Link, NavLink } from 'react-router-dom';
import * as actUser from '../../redux/actions/manageUser/actManageUsers';
import * as URL from '../../constants/url';

function NavUserPage({ account_current }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const listCart = useSelector((state) => state.manageCustomerCart.list);

  function logOut() {
    dispatch(actUser.actLogOut({ status: false }));
    localStorage.removeItem('token');
    history.push(URL.HOME);
  }

  function renderCountCart(listCart) {
    let total = 0;
    if (listCart.length > 0) {
      for (var i = 0; i < listCart.length; i++) {
        total += listCart[i].quantily ? listCart[i].quantily : 0;
      }
    }
    return total ? total : 0;
  }

  const menu = (
    <Menu>
      {
        account_current.status
          ?
          (
            <>
              <Menu.Item key="1">
                <NavLink to={URL.PROFILE} className="my-link">
                  Thông tin cá nhân
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <a
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
              </Menu.Item>
            </>
          )
          :
          (
            <>
              <Menu.Item key="1">
                <NavLink to={URL.LOGIN} className="my-link" style={{ fontSize: '15px' }}>
                  Đăng ký / Đăng nhập
                </NavLink>
              </Menu.Item>
            </>
          )
      }
    </Menu>
  );

  return (
    <>
      <div className="background-header"></div>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-sm navbar-header">
          <div className="container">
            <Link to={URL.HOME} className="my-link">
              <a className="navbar-brand text-success" style={{ paddingBottom: '1px' }}>
                Geeksforgeeks
              </a>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" />

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto mt-2">
                <Link to={URL.HOME} className="my-link">
                  <li className="nav-item active">
                    <a
                      className="nav-link"
                    >
                      Trang Chủ
                      <span className="sr-only">
                        (current)
                      </span>
                    </a>
                  </li>
                </Link>
                <Link to={URL.ABOUT} className="my-link">
                  <li className="nav-item active">
                    <a
                      className="nav-link"
                    >
                      Giới Thiệu
                    </a>
                  </li>
                </Link>
                <Link to={URL.CONTACT} className="my-link">
                  <li className="nav-item active">
                    <a
                      className="nav-link"
                    >
                      Liên Hệ
                    </a>
                  </li>
                </Link>
                <div className="nav">
                  <ul>
                    <li className="nav-item active">
                      <Link to={URL.PRODUCT} className="my-link">
                        <a
                          className="nav-link"
                        >
                          Sản Phẩm <DownOutlined id="icon-downoutLine" style={{ fontSize: '12px' }} />
                        </a>
                      </Link>
                      <ul class="drop-menu menu-7">
                        <li>T-Shirt</li>
                        <li>Hoodie</li>
                        <li>Jacket</li>
                        <li>Pants</li>
                        <li>Sơ Mi</li>
                        <li>Accessories</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </ul>
              <form className="form-inline">
                <Input
                  // value={text}
                  // className="form-control mr-sm-2"
                  name="search"
                  size="large"
                  placeholder="Tìm kiếm..."
                  bordered
                  suffix={<SearchOutlined />}
                  // onChange={(e) => onChangeHandler(e.target.value)}
                  style={{ width: 230, marginTop: '5px', marginRight: '10px' }}
                />
                {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" /> */}
                <Link to="/Gio-hang" activeOnlyWhenExact={false} >
                  <a className="mr-3" type="submit">
                    <Badge size="small" count={renderCountCart(listCart)} showZero>
                      <ShoppingCartOutlined style={{ color: 'white', fontSize: '25px' }} />
                    </Badge>
                    {/* <ShoppingCartOutlined style={{ color: 'white' }} /> */}
                  </a>
                </Link>
                <div className="users-register-login">
                  {
                    account_current.status && account_current !== null && account_current !== undefined ?
                      <Dropdown overlay={menu} arrow>
                        <Avatar style={{ background: '#f56a00', width: '48px', height: '48px', fontSize: '20px', paddingTop: '6px' }}>
                          {
                            account_current.user
                              ?
                              account_current.user.name.slice(0, 1)
                              :
                              account_current.name.slice(0, 1)
                          }
                        </Avatar>
                      </Dropdown>
                      :
                      <Dropdown overlay={menu} arrow>
                        <Button style={{ height: '50px', color: 'black' }}>
                          <i className="fas fa-user" />
                        </Button>
                      </Dropdown>
                  }
                </div>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default NavUserPage;