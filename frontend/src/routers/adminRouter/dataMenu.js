import * as URL from '../../constants/url';

export const menuListAdmin = [
  {
    name: 'Hệ thống',
    type: 'Menu',
    children: [
      {
        name: 'Quản lý sản phẩm',
        children: [
          {
            name: 'Sản phẩm',
            to: URL.PRODUCTS,
            exact: true,
          },
        ],
      },
      {
        name: 'Quản lý categories',
        children: [
          {
            name: 'Categories',
            to: URL.CATEGORY,
            exact: true,
          },
        ],
      },
      {
        name: 'Quản lý type',
        children: [
          {
            name: 'Type',
            to: URL.TYPE,
            exact: true,
          },
        ],
      },
      {
        name: 'Quản lý ảnh quảng cáo',
        children: [
          {
            name: 'Ảnh quảng cáo',
            to: URL.CAROUSEL,
            exact: true,
          },
        ],
      },
      {
        name: 'Quản lý màu',
        children: [
          {
            name: 'Màu',
            to: URL.COLOR,
            exact: true,
          },
        ],
      },
      {
        name: 'Quản lý đơn hàng',
        children: [
          {
            name: 'Đơn hàng',
            to: URL.ODERS,
            exact: true,
          },
        ],
      },
    ],
  },
];
