const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const categoryRoute = require('./category.route');
const typeProductRoute = require('./typeProduct.route');
const productRoute = require('./productItem.route');
const docsRoute = require('./docs.route');
const slidersRoute = require('./slider.route');
const colorRoute = require('./color.route');
const oderListCartRoute = require('./oderProduct.route');
const commentRoute = require('./comment.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },

  {
    path: '/categories',
    route: categoryRoute,
  },

  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/typeProducts',
    route: typeProductRoute,
  },
  {
    path: '/sliders',
    route: slidersRoute,
  },
  {
    path: '/colors',
    route: colorRoute,
  },
  {
    path: '/oderCart',
    route: oderListCartRoute,
  },
  {
    path: '/comment',
    route: commentRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
