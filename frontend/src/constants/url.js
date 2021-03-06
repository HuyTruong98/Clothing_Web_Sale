export const server = 'http://localhost:3000/v1/';
export const serverImg = 'http://localhost:3000/uploads';

export const getUser = server + 'users';
export const login = server + 'auth/login';
export const register = server + 'auth/register';
export const logout = server + 'auth/logout';
export const FORGET_PASSWORD = server + 'auth/forgot-password';

// url TRANG USER
export const LOGIN = '/Dang-nhap';
export const HOME = '/';
export const ABOUT = '/Gioi-thieu';
export const CONTACT = '/Lien-he';
export const PROFILE = '/Thong-tin-ca-nhan';
export const PRODUCT = '/San-pham';
export const IDPRODUCT = '/San-pham/:id/:name';
export const CUSTOMER_CART = '/Gio-hang';
export const PAY_MENT = '/Check-out';
export const PAY_MENT_SUCCESS = '/Check-out-success';
export const SEARCH_PRODUCT = '/Tim-kiem/San-pham';
export const NOT_FOUND = '/404-Not-Found';
export const RESET_PASSWORD = '/reset-password/token=:token';

// trang admin
export const PRODUCTS = '/dashboard/products';
export const PRODUCTID = '/dashboard/products/:id';
export const CATEGORY = '/dashboard/categories';
export const TYPE = '/dashboard/typeProduct';
export const CAROUSEL = '/dashboard/carousel';
export const COLOR = '/dashboard/color';
export const ODERS = '/dashboard/oders';
export const ODERSID = '/dashboard/oders/:id/:code_oders';
export const CODE_SALE = '/dashboard/code-sale';
