/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react';
import { Table, Divider, Popconfirm, Tooltip, Image, Pagination, Modal } from 'antd';
import { QuestionCircleOutlined, EyeOutlined } from '@ant-design/icons';
import * as Message from '../../constants/Message';
import * as Api from '../../constants/url';
import { renderMoney } from '../../constants/renderConvert';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, NavLink } from "react-router-dom";

function TableProducts({ listProduct, listCategory, listType,
  onEdit, onDelete, setFilter, filter, match, listColor }) {
  const totalPage = useSelector((state) => state.manageTotalProduct.item);
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      // fixed: 'left',
      // width: 180,
      render: (data, record) => renderDetail(record),
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'productCode',
      fixed: 'left',
      // width: 150,
    },
    {
      title: 'Category',
      // width: 180,
      dataIndex: 'categoryId',
      // eslint-disable-next-line no-use-before-define
      render: (record) => renderCategoryId(record),
    },
    {
      // width: 180,
      title: 'Type',
      dataIndex: 'typeProductId',
      // eslint-disable-next-line no-use-before-define
      render: (record) => renderTypeId(record),
    },
    {
      title: 'Giá',
      // width: 150,
      dataIndex: 'price',
      // eslint-disable-next-line no-use-before-define
      render: (record) => renderPrice(record),
    },
    {
      title: 'Mô tả',
      // width: 230,
      dataIndex: 'description',
      ellipsis: {
        showTitle: false,
      },
      // eslint-disable-next-line no-use-before-define
      render: (record) => renderDescription(record),
    },
    {
      title: 'Ảnh',
      dataIndex: 'imgProduct',
      with: 700,
      render: (record) => renderImg(record),
    },
    {
      title: 'Size & Màu & Số lượng',
      dataIndex: 'sizeAndColorAndNumber',
      with: 200,
      render: (record) => rendenSizeAndColorAndNumber(record),
    },
    {
      title: 'Chức năng',
      dataIndex: 'action',
      // eslint-disable-next-line no-use-before-define
      render: (data, record) => actionRender(record),
    },
    {
      title: 'Deal Hot',
      dataIndex: 'dealHot',
      // eslint-disable-next-line no-use-before-define
      render: (record) => actionHotDeal(record),
    },
    {
      title: 'Best Seller',
      dataIndex: 'bestSeller',
      fixed: 'right',
      // width: 80,
      // eslint-disable-next-line no-use-before-define
      render: (record) => actionRenderBestSeller(record),
    },
  ];

  function actionRenderBestSeller(record) {
    return record === 'best-seller' ? <i style={{ color: '#ffac4b', fontSize: '20px' }} className="fas fa-medal"></i> : ''
  }

  function actionHotDeal(record) {
    return record === '' ? '' : <p>🔥</p>
  }

  function renderDetail(record) {
    const url = match.url;
    return (
      <NavLink to={`${url}/${record._id}`}>{record.name}</NavLink>
    );
  }

  function info(record) {
    Modal.info({
      title: 'Hiện tại sản phẩm có :',
      content: (
        <div>
          {
            Array.isArray(record) && record.length > 0 && record.map((item, index) => {
              console.log(item);
              return (
                <>
                  <div key={index} className="info-size">
                    <p>Size: {item.size}</p>
                    {
                      listColor.map((itemColor) => {
                        if (itemColor._id === item.colorProductId) {
                          return (
                            <p>Màu: {itemColor.name}</p>
                          );
                        }
                      })
                    }
                    <p>Số lượng: {item.howNumber}</p>
                  </div>
                </>
              );
            })
          }
        </div>
      ),
      onOk() { },
    });
  }

  function rendenSizeAndColorAndNumber(record) {
    return (
      <div class="text-center">
        <Tooltip color="green" placement="bottomLeft" title="Xem Size & Màu & Số lượng">
          <a style={{ color: 'red', fontSize: '16px' }} onClick={() => info(record)}><EyeOutlined /></a>
        </Tooltip>
      </div>
    );
  }

  function renderImg(record) {
    return (
      Array.isArray(record) && record.length > 0 && record.map((item, index) => {
        if (index === 0) {
          return (
            <>
              <Image
                style={{ width: '97px', paddingRight: '5px' }}
                src={`${Api.serverImg}/${item.imgUrl}`}
              />
            </>
          );
        }
      })
    );
  }

  function renderDescription(record) {
    return (
      <Tooltip style={{ textAlign: 'justify' }} color="green" placement="topLeft" title={record}>
        {record}
      </Tooltip>
    );
  }

  function renderCategoryId(record) {
    // eslint-disable-next-line no-underscore-dangle
    return listCategory.filter((item) => item._id === record).length > 0
      // eslint-disable-next-line no-underscore-dangle
      ? listCategory.filter((item) => item._id === record).map((item) => {
        return (
          <p>{item.name}</p>
        );
      }) : '';
  }

  function renderTypeId(record) {
    // eslint-disable-next-line no-underscore-dangle
    return listType.filter((item) => item._id === record).length > 0
      // eslint-disable-next-line no-underscore-dangle
      ? listType.filter((item) => item._id === record).map((item) => {
        return (
          <p>{item.name}</p>
        );
      }) : '';
  }

  function onDeleteRequest(id) {
    onDelete(id);
  }

  function actionRender(record) {
    return (
      <>
        <div className="row">
          <div className="col-xs-6">
            <a>
              <i
                onClick={() => {
                  onEdit(record._id);
                }}
                className="fas fa-edit"
                style={{
                  color: 'green', fontSize: '16px', paddingRight: '30px', paddingLeft: '20px',
                }}
              />
            </a>
          </div>

          <div className="col-xs-6">
            <Popconfirm
              placement="topLeft"
              title={Message.BAN_CO_MUON_XOA}
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              // eslint-disable-next-line no-underscore-dangle
              onConfirm={() => onDeleteRequest(record._id)}
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

  function renderPrice(record) {
    return (
      <p>{renderMoney(record)}</p>
    );
  }

  function handleChangePagination(page, pageSize) {
    setFilter((filter) => ({ ...filter, page }))
  }

  useEffect(() => {
    if (listProduct.length === 0) {
      const { page } = filter;
      const changePage = page > 1 ? page - 1 : page;
      setFilter((filter) => ({ ...filter, page: changePage }))
    }
  }, [listProduct.length === 0]);

  return (
    <div>
      <Divider />
      <Table
        pagination={false}
        columns={columns}
        dataSource={listProduct}
      />
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Pagination
          total={totalPage}
          pageSize={filter.limit}
          onChange={(page, pageSize) => handleChangePagination(page, pageSize)}
          current={filter.page}
        />
      </div>
    </div>
  );
}

export default TableProducts;
