/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Divider, Table, Popconfirm, Image } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import * as Message from '../../constants/Message';
import { useSelector } from 'react-redux';
import { renderMoney } from '../../constants/renderConvert';
import * as ApiImg from '../../constants/url';
import { BrowserRouter as Router, NavLink } from "react-router-dom";

function TableOrders({ listOrder, city, match, listColor, count }) {
  const listUser = useSelector((state) => state.manageUser.list);
  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'code_oders',
      fixed: 'left',
      render: (data, record) => renderDetail(record),
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'oderListCart',
      fixed: 'left',
      render: (data, record) => actionRenderProducts(record),
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      fixed: 'left',
    },
    {
      title: 'Chủ tài khoản',
      dataIndex: 'account_current',
      fixed: 'left',
      render: (data, record) => actionRenderAccountOrder(record),
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      fixed: 'left',
      render: (data, record) => renderPhone(record),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      fixed: 'left',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      fixed: 'left',
    },
    {
      title: 'Thành Phố',
      dataIndex: 'city',
      fixed: 'left',
      render: (data, record) => actionRenderNameCity(record),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'priceOrder',
      fixed: 'left',
      render: (data, record) => actionRenderPriceOrders(record),
    },
    {
      title: 'Chức năng',
      dataIndex: 'action',
      width: '5%',
      fixed: 'right',
      // eslint-disable-next-line no-use-before-define
      render: (data, record) => actionRender(record),
    },
    {
      title: 'Trạng thái đơn',
      dataIndex: 'current_order',
      width: '5%',
      fixed: 'right',
      // eslint-disable-next-line no-use-before-define
      render: (data, record) => actionStatus(record),
    },
  ];

  function actionStatus(record) {
    if (record.current_order === 3) {
      return (
        <>
          <i className="fas fa-check-circle" style={{ fontSize: '20px', color: 'greenyellow' }}></i>
        </>
      );
    }
  }

  function renderDetail(record) {
    const url = match.url;
    return (
      <span>
        <NavLink to={`${url}/${record._id}/${record.code_oders}`}>{record.code_oders}</NavLink>
      </span>
    );
  }

  function actionRenderPriceOrders(record) {
    return <span>{renderMoney(record.priceOrder)}</span>
  }

  function actionRenderProducts(record) {
    return (
      Array.isArray(record.oderListCart) && record.oderListCart.length > 0
      && record.oderListCart.map((item, index) => {
        return (
          <>
            <div className="list-order-all" key={index}>
              <div className="list-order-image">
                <Image src={`${ApiImg.serverImg}/${item.imgProduct}`} width="70px" />
              </div>
              <div className="list-order-title">
                <span>
                  {item.name} <br />
                </span>
                {listColor.map((itemColor, indexColor) => {
                  if (itemColor._id === item.colorProductId) {
                    return (
                      <span key={indexColor}>
                        {itemColor.name} <br />
                      </span>
                    );
                  };
                })}
                <span>
                  Size: {item.size} <br />
                </span>
                <span>
                  Số lượng: {item.quantily} <br />
                </span>
              </div>
            </div>
          </>
        );
      })
    );
  }

  function actionRenderAccountOrder(record) {
    const nameAccountOrder = listUser.find((item) => item.id === record.account_current);
    return nameAccountOrder ? nameAccountOrder.name : 'Không có';
  }

  function actionRenderNameCity(record) {
    const nameCity = city.find((item) => item.ProvinceID === record.city);
    return nameCity ? nameCity.ProvinceName : '';
  }

  function renderPhone(record) {
    return <span>0{record.phoneNumber}</span>
  }

  function actionRender(record) {
    return (
      <>
        <div className="row">
          <div className="col-xs-6">
            <Popconfirm
              placement="topLeft"
              title={Message.BAN_CO_MUON_XOA}
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              // eslint-disable-next-line no-underscore-dangle
              // onConfirm={() => onDeleteRequest(record._id)}
              okText="Yes"
              cancelText="No"
            >
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <i
                  className="fas fa-trash-alt"
                  style={{ color: 'red', fontSize: '16px' }}
                />
              </a>
            </Popconfirm>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Divider />
      <Table
        columns={columns}
        dataSource={listOrder}
      />
    </>
  );
}

export default TableOrders;
