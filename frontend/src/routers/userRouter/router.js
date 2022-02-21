/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import * as URL from '../../constants/url';
import NavUserPage from './NavUserPage';
import Home from '../../pages/userPage/Home';
import Login from "../../pages/userPage/login/Login";
import Profile from '../../pages/userPage/profile/Profile';
import Introduce from '../../pages/userPage/Introduce';
import Contact from '../../pages/userPage/Contact';
import Products from '../../pages/userPage/Products-all-user/products';
import DetailProduct from '../../pages/userPage/Detail-Product';
import Customer_Cart from '../../pages/userPage/Cart/Customer-Cart';
import Pay_Ment from '../../pages/userPage/Payment/payment';
import PaymentSuccess from '../../pages/userPage/Payment/PaymentSuccess';
import NotFound from '../../pages/404/index';

function RouterPageUser({ account_current, listCartCustomer }) {
  return (
    <>
      <NavUserPage account_current={account_current} />
      <Switch>
        <Route path={URL.HOME} exact component={Home} />
        <Route path={URL.ABOUT} component={Introduce} />
        <Route path={URL.CONTACT} component={Contact} />
        <Route exact path={URL.IDPRODUCT} component={DetailProduct} />
        <Route path={URL.PRODUCT} component={Products} />
        <Route path={URL.CUSTOMER_CART} component={Customer_Cart} />
        <Route path={URL.PAY_MENT_SUCCESS} component={PaymentSuccess} />
        {
          account_current.status && account_current !== null && account_current !== undefined
            ?
            <Route path={URL.PROFILE} component={Profile} />
            :
            <Route path={URL.NOT_FOUND} component={NotFound} />
        }
        {
          listCartCustomer.length > 0
            ?
            <Route path={URL.PAY_MENT} component={Pay_Ment} />
            :
            <Route path={URL.NOT_FOUND} component={NotFound} />
        }
        {
          account_current.status && account_current !== null && account_current !== undefined
            ?
            <Redirect to={URL.HOME} />
            :
            <Route path={URL.LOGIN} component={Login} />
        }
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default RouterPageUser;