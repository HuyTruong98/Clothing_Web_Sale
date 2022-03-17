/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
// import firebase from 'firebase';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import AdminPage from './pages/adminPage/page';
import UserPage from './pages/userPage/page';
import * as actFetchCategory from './redux/actions/manageCategory/actManageCategory';
import * as actFetchProducts from './redux/actions/managerProducts/actManageProducts';
import * as actFetchType from './redux/actions/manageType/actManageType';
import * as actFetchUser from './redux/actions/manageUser/actManageUsers';

// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE_API,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// };
// firebase.initializeApp(config);

function App() {
  const dispatch = useDispatch();
  const account_current = useSelector((state) => state.manageLogin.account_current);
  const listCartCustomer = useSelector((state) => state.manageCustomerCart.list);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).id) {
      dispatch(actFetchUser.actGetTaiKhoanByIdInApplicationRequest(
        JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).id
      ));
    }
  }, []);

  useEffect(() => {
    dispatch(actFetchUser.actFetchUserRequest());
    dispatch(actFetchCategory.actFetchCategoriesRequest());
    dispatch(actFetchType.actFetchTypesRequest());
    dispatch(actFetchProducts.actFetchPaginationProductRequest());
  }, []);

  // useEffect(() => {
  //   const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
  //     if (!user) {
  //       console.log('User is not logged in', user);
  //       return;
  //     }
  //     console.log('logged', user.displayName);
  //     const token = await user.getIdToken();
  //     console.log('logged', token);
  //   });
  //   return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  // }, []);

  return (
    <div className="App m-0">
      {
        account_current.user
          ?
          (
            account_current.status && account_current.user?.role === 'admin' && account_current !== null ?
              (
                <AdminPage account_current={account_current} />
              )
              :
              (
                <UserPage account_current={account_current} listCartCustomer={listCartCustomer} />
              )
          )
          :
          (
            account_current.status && account_current.role === 'admin' && account_current !== null && account_current !== undefined
              ?
              (
                <AdminPage account_current={account_current} />
              )
              :
              (
                <UserPage account_current={account_current} listCartCustomer={listCartCustomer} />
              )
          )
      }
    </div>
  );
}

export default App;
