/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import * as URL from '../../../constants/url';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import * as actColor from '../../../redux/actions/manageColor/actManageColor';
import { useDispatch, useSelector } from 'react-redux';
import { renderMoney } from '../../../constants/renderConvert';
import TableCart from './TableCart';
import Lottie from 'react-lottie';
import { Button } from 'antd';
import * as location from '../../../JSON/63274-loading-animation.json';
import { manageAlert } from '../../../constants/Alert';
import * as Message from '../../../constants/Message';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: location.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};
function Customer_Cart() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(undefined);
	const listCart = useSelector((state) => state.manageCustomerCart.list);
	const listColor = useSelector((state) => state.manageColor.list);
	const account_current = useSelector((state) => state.manageLogin.account_current);

	function showToTalAmount(listCart) {
		let total = 0;
		if (listCart.length > 0) {
			for (var i = 0; i < listCart.length; i++) {
				total += (listCart[i].priceSale === 0 ? listCart[i].price : listCart[i].priceSale) * listCart[i].quantily;
			}
		}
		return renderMoney(total);
	}

	function onReport() {
		manageAlert(Message.MOI_BAN_DANG_NHAP_DE_THANH_TOAN);
	}

	useEffect(() => {
		window.scrollTo(0, 0);
		setTimeout(() => {
			dispatch(actColor.actFetchColorsRequest());
			setLoading(true);
		}, 1500);
	}, []);
	return (
		<>
			{
				!loading
					?
					(
						<>
							<div className="breadcrumb_background">
								<div className="container">
									<div className="row">
										<div className="col-xs-12 a-left">
											<p><Link style={{ color: 'white' }} to={URL.HOME} className="my-link hover-link">Trang chủ</Link> &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Giỏ hàng</span></p>
										</div>
									</div>
								</div>
							</div>
							<div className="spinner-show">
								<Lottie options={defaultOptions}
									height={400}
									width={400}
								/>
							</div>
						</>
					)
					:
					(
						<>
							{
								listCart && listCart.length > 0
									?
									(
										<>
											<div className="breadcrumb_background">
												<div className="container">
													<div className="row">
														<div className="col-xs-12 a-left">
															<p><Link style={{ color: 'white' }} to={URL.HOME} className="my-link hover-link">Trang chủ</Link> &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Giỏ hàng</span></p>
														</div>
													</div>
												</div>
											</div>
											<div class="container">
												<div class="row">
													<div className="breadcrumb-product-detail">
														<p style={{ fontSize: '20px', width: '100%', marginBottom: '60px', marginTop: '40px', fontWeight: 500 }}>Giỏ hàng của bạn ❤️</p>
														<div className="col-md-12">
															<table className="table">
																<thead>
																	<tr>
																		<th>Tên sản phẩm</th>
																		<th>Mã sản phẩm</th>
																		<th>Ảnh sản phẩm</th>
																		<th>Size</th>
																		<th>Màu</th>
																		<th>Đơn giá</th>
																		<th>Số lượng</th>
																		<th>Thành tiền</th>
																		<th>Xóa</th>
																		<th></th>
																	</tr>
																</thead>
																<tbody>
																	<TableCart
																		listCart={listCart}
																		listColor={listColor}
																	/>
																	<tr>
																		<td></td>
																		<td></td>
																		<td></td>
																		<td></td>
																		<td></td>
																		<td></td>
																		<td></td>
																		<td></td>
																		<td></td>
																		<td></td>
																		<td></td>
																	</tr>
																</tbody>
															</table>
															<div className="totalAmount">
																Tổng tiền :{showToTalAmount(listCart)}
															</div>
															<div className="payment">
																<Link to={URL.HOME}>
																	<Button
																		style={{ backgroundColor: '#f3f3f3', height: '40px', border: 'none' }}
																	>
																		<strong>Tiếp tục mua sắm</strong>
																	</Button>
																</Link>
																&emsp;

																{
																	account_current && account_current.status === true
																		?
																		(
																			<>
																				<Link to={URL.PAY_MENT}>
																					<Button
																						style={{ backgroundColor: '#ffac4b', height: '40px', border: 'none' }}
																					>
																						<strong> Tiến hành thanh toán</strong>
																					</Button>
																				</Link>
																			</>
																		)
																		:
																		(
																			<>
																				<Button
																					onClick={() => onReport()}
																					style={{ backgroundColor: '#ffac4b', height: '40px', border: 'none' }}
																				>
																					<strong> Tiến hành thanh toán</strong>
																				</Button>
																			</>
																		)
																}
															</div>
														</div>
													</div>
												</div>
											</div>
											<div style={{ height: '800px' }}></div>
										</>
									)
									:
									(
										<>
											<div className="breadcrumb_background">
												<div className="container">
													<div className="row">
														<div className="col-xs-12 a-left">
															<p><Link style={{ color: 'white' }} to={URL.HOME} className="my-link hover-link">Trang chủ</Link> &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Giỏ hàng</span></p>
														</div>
													</div>
												</div>
											</div>
											<div class="container">
												<div class="row">
													<div className="breadcrumb-product-detail ">
														<p style={{ fontSize: '20px', width: '100%', marginBottom: '60px' }}></p>
														<div className="layout-no-product">
															<img
																src="https://cdn.dribbble.com/users/4107928/screenshots/14928630/media/bfa6607a8c7c8089b20e1a36505b6c51.jpg?compress=1&resize=400x300"
																width="40%" height="40%"
															/>
															<h4>Giỏ hàng của bạn chưa có sản phẩm!</h4>
															<br />
															<Link to={URL.HOME}>
																<Button style={{ backgroundColor: '#ffac4b', height: '40px', border: 'none' }}>
																	<strong>Quay lại trang chủ</strong>
																</Button>
															</Link>
														</div>
													</div>
												</div>
											</div>
											<div style={{ height: '300px' }}></div>
										</>
									)
							}
						</>
					)
			}
		</>
	);
}

export default Customer_Cart;
