/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import * as URL from '../../constants/url';
import NavUserPage from './NavUserPage';
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
import RenderProduct from '../../pages/userPage/Search-Product/render-product';
import ResetPassWord from '../../components/login/Reset_PassWord/ResetPassWord';
import Lottie from 'react-lottie';
import * as location from '../../JSON/63274-loading-animation.json';

const Home = React.lazy(() => import('../../pages/userPage/Home'));

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
function RouterPageUser({ account_current, listCartCustomer }) {
  return (
    <>
      <Suspense fallback={
        <div className="spinner-show">
          <Lottie options={defaultOptions}
            height={400}
            width={400}
          />
        </div>
      }>
        <NavUserPage account_current={account_current} />
        <Switch>
          <Route path={URL.HOME} exact component={Home} />
          <Route path={URL.ABOUT} component={Introduce} />
          <Route path={URL.CONTACT} component={Contact} />
          <Route exact path={URL.IDPRODUCT} component={DetailProduct} />
          <Route path={URL.PRODUCT} component={Products} />
          <Route path={URL.CUSTOMER_CART} component={Customer_Cart} />
          <Route path={URL.PAY_MENT_SUCCESS} component={PaymentSuccess} />
          <Route path={URL.SEARCH_PRODUCT} component={RenderProduct} />
          <Route path={URL.RESET_PASSWORD} component={ResetPassWord} />
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
      </Suspense>
    </>
  );
}

export default RouterPageUser;