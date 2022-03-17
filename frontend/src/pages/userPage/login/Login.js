/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import FormLogin from '../../../components/login/FormLogin';
import ModalFormRegister from '../../../components/ManageUser/Modal';
import ModalForgetPass from '../../../components/ManageUser/ModalForgetPass';
import * as actLoginForm from '../../../redux/actions/manageUser/actManageUsers';
import * as URL from '../../../constants/url';

function Login() {
  const dispatch = useDispatch();
  const [form] = useForm();
  const [time, setTime] = useState(false);
  const [openModal, setOpenMadal] = useState(false);
  const [openForgetPass, setOpenForgetPass] = useState(false);
  const dataUser = useSelector((state) => state.manageUser.list);

  function onForget(value) {
    dispatch(actLoginForm.actForgetPassUserRequest(value));
    setTime(true);
    setTimeout(() => {
      cancel();
    }, 2200);
  }

  function onFinish(value) {
    dispatch(actLoginForm.actLogin(value, setLoginSuccess));
  }

  function setLoginSuccess(value) {
    dispatch(actLoginForm.actLoginUserSuccess(value));
  }

  function onSave(value) {
    const userSuccessIndex = dataUser.findIndex((item, index) => value.email === item.email);
    if (userSuccessIndex !== -1) {
      form.setFields([
        {
          name: 'email',
          errors: ['Email đăng kí đã tồn tại'],
        }
      ]);
    } else {
      const newValue = {
        name: value.name,
        email: value.email,
        password: value.password,
      };
      dispatch(actLoginForm.actCreateUserRequest(newValue));
      cancel();
    }
  }

  const cancel = () => {
    setOpenMadal(false);
    setOpenForgetPass(false);
    setTime(false);
  };

  function resetPassWord() {
    setOpenForgetPass(true);
  }

  function registerUser() {
    setOpenMadal(true);
  }
  return (
    <>
      <div className="breadcrumb_background">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 a-left">
              <p><Link style={{ color: 'white' }} to={URL.HOME} className="my-link hover-link">Trang chủ</Link> &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Đăng nhập</span></p>
            </div>
          </div>
        </div>
      </div>
      <div className="breadcrumb-product-detail">
        <div className="background-image-login">
          <div className="form-v2">
            <div className="page-content">
              <div className="form-v2-content">
                <div className="form-left">
                  <img src="https://wallpaperaccess.com/full/447970.jpg" alt="form" width="100%" height="100%" />
                  <div className="text-1">
                    {/* <p>Geeksforgeeks<span>Xin chào!</span></p> */}
                  </div>
                </div>
                <div className="form-detail" action="#" method="post" id="myform">
                  <FormLogin onFinish={onFinish} />
                  <div className="form-register">
                    <a onClick={() => resetPassWord()}>Quên mật khẩu?</a>
                    <br />
                    <br />
                    <br />
                    <a onClick={() => registerUser()} >
                      <span style={{ marginTop: '100px' }} className="register-arrow">Đăng ký &nbsp; <i className="fas fa-long-arrow-alt-right" /></span>
                    </a>
                  </div>
                  {/* <StyledFirebaseAuth
                    uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalFormRegister
        isVisible={openModal}
        handleCancel={() => cancel()}
        onSave={onSave}
        form={form}
      />
      <ModalForgetPass
        isVisible={openForgetPass}
        handleCancel={() => cancel()}
        onForget={onForget}
        form={form}
        time={time}
      />
    </>
  );
}

export default Login;
