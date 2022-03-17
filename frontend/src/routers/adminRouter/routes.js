import React from 'react';
import Home from '../../pages/adminPage/Home';
import ProductsItem from '../../pages/adminPage/ManageAdmin/productsItem';
import PageCategory from '../../pages/adminPage/ManageAdmin/pageCategory';
import PageType from '../../pages/adminPage/ManageAdmin/pageTypeProduct';
import * as URL from '../../constants/url';
import PageCarousel from '../../pages/adminPage/ManageAdmin/pageCarousel';
import DetailProduct from '../../components/ManageProducts/Detail';
import PageColor from '../../pages/adminPage/ManageAdmin/pageColor';
import PageOrderProduct from '../../pages/adminPage/ManageAdmin/pageOrderProduct';
import DetailOrders from '../../components/ManageOrders/Detail';
import PageCodeSale from '../../pages/adminPage/ManageAdmin/pageCodeSale';

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Home />
  },
  {
    path: URL.LOGIN,
    exact: true,
    main: () => <Home />
  },
  {
    path: URL.PRODUCTS,
    exact: true,
    main: ({ match, location }) => (
      <ProductsItem location={location} match={match} />
    ),
  },
  {
    path: URL.PRODUCTID,
    exact: true,
    main: ({ history, match }) => <DetailProduct history={history} match={match} />,
  },
  {
    path: URL.CATEGORY,
    exact: true,
    main: ({ match, location }) => (
      <PageCategory location={location} match={match} />
    ),
  },
  {
    path: URL.TYPE,
    exact: true,
    main: ({ match, location }) => (
      <PageType location={location} match={match} />
    ),
  },
  {
    path: URL.CAROUSEL,
    exact: true,
    main: ({ match, location }) => (
      <PageCarousel location={location} match={match} />
    ),
  },
  {
    path: URL.COLOR,
    exact: true,
    main: ({ match, location }) => (
      <PageColor location={location} match={match} />
    ),
  },
  {
    path: URL.ODERS,
    exact: true,
    main: ({ match, location }) => (
      <PageOrderProduct location={location} match={match} />
    ),
  },
  {
    path: URL.ODERSID,
    exact: true,
    main: ({ match, location, history }) => (
      <DetailOrders location={location} match={match} history={history} />
    ),
  },
  {
    path: URL.CODE_SALE,
    exact: true,
    main: ({ match, location }) => (
      <PageCodeSale location={location} match={match} />
    ),
  },
];

export default routes;