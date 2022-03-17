/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Menu, Dropdown, Badge, Avatar, Input } from 'antd';
import { Button } from 'react-rainbow-components';
import { SearchOutlined, ShoppingCartOutlined, DownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Route, Link, NavLink } from 'react-router-dom';
import LayoutSearch from '../../pages/userPage/Search-Product/LayoutSearch';
import * as actUser from '../../redux/actions/manageUser/actManageUsers';
import * as URL from '../../constants/url';
import * as actSearchTerm from '../../redux/actions/manageSearchTerm/actManageSearchTerm';

function NavUserPage({ account_current }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const listCart = useSelector((state) => state.manageCustomerCart.list);
  const account = account_current.user ? account_current.user : account_current;
  const refreshToken = JSON.parse(localStorage.getItem('token'))?.token;

  function logOut() {
    dispatch(actUser.actLogOutUserRequest({ refreshToken: refreshToken }));
    dispatch(actUser.actLogOut({ status: false }));
    localStorage.removeItem('token');
    history.push(URL.HOME);
    dispatch(actSearchTerm.actSearchTermStatus({ status: true }));
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
                <NavLink to={URL.PROFILE} className="my-link" onClick={handleOnclick}>
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
                <NavLink to={URL.LOGIN} className="my-link" onClick={handleOnclick} style={{ fontSize: '15px' }}>
                  Đăng ký / Đăng nhập
                </NavLink>
              </Menu.Item>
            </>
          )
      }
    </Menu>
  );

  function handleOnclick() {
    dispatch(actSearchTerm.actSearchTermStatus({ status: true }));
  }
  return (
    <>
      <div className="background-header"></div>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-sm navbar-header">
          <div className="container">
            <a
              className="navbar-brand text-success"
              style={{ paddingBottom: '1px' }}
              onClick={handleOnclick}
            >
              <Link to={URL.HOME} className="my-link">
                Geeksforgeeks
              </Link>
            </a>
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
              <ul className="navbar-nav mr-auto mt-2" onClick={handleOnclick}>
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
                  <li className="nav-item active" onClick={handleOnclick}>
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
                <LayoutSearch />
                <Link to={URL.CUSTOMER_CART} activeOnlyWhenExact={false}>
                  <a className="mr-3" type="submit" onClick={handleOnclick}>
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
                        {
                          account.image
                            ?
                            <img src={`${URL.serverImg}/${account.image}`} className="rounded-circle-nav" width="100%" />
                            :
                            <Avatar style={{ background: '#f56a00', width: '48px', height: '48px', fontSize: '20px', paddingTop: '6px' }}>
                              {
                                account_current.user
                                  ?
                                  account_current.user.name.slice(0, 1)
                                  :
                                  account_current.name.slice(0, 1)
                              }
                            </Avatar>
                        }
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
