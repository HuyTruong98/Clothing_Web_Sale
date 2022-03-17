import { combineReducers } from 'redux';
import manageUser from './manageUser';
import manageProducts from './manageProducts';
import manageLogin from './manageLogin';
import manageCategory from './manageCategory'
import manageTypes from './manageType'
import manageTotalProduct from './manageTotalProduct';
import manageSliders from './manageSliders';
import manageColor from './manageColor';
import manageCustomerCart from './manageCustomerCart'
import manageOderListCart from './manageOderListCart';
import manageSearchTerm from './manageSearchTerm';

const appReducers = combineReducers({
  manageUser,
  manageProducts,
  manageLogin,
  manageCategory,
  manageTypes,
  manageTotalProduct,
  manageSliders,
  manageColor,
  manageCustomerCart,
  manageOderListCart,
  manageSearchTerm,
});

export default appReducers;