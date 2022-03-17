/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { Table, Divider, Popconfirm, Pagination } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import * as Message from '../../constants/Message';
import { renderMoney } from '../../constants/renderConvert';

function TableCodeSale({ listCodeSale, onEdit, page, filter, setFilter, onDelete }) {
  const columns = [
    {
      title: 'Mã code sale',
      dataIndex: 'code',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (record) => renderPrice(record),
    },
    {
      title: 'Số lần sử dụng',
      dataIndex: 'quantily',
    },
    {
      title: 'Chức năng',
      dataIndex: 'action',
      fixed: 'right',
      // eslint-disable-next-line no-use-before-define
      render: (data, record) => actionRender(record),
    },
  ];

  function renderPrice(record) {
    return (
      <p>{renderMoney(record)}</p>
    );
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

  function handleChangePagination(page, pageSize) {
    setFilter((filter) => ({ ...filter, page }));
  }

  useEffect(() => {
    if (listCodeSale.length === 0) {
      const { page } = filter;
      const changePage = page > 1 ? page - 1 : page;
      setFilter((filter) => ({ ...filter, page: changePage }));
    }
  }, [listCodeSale.length === 0]);
  return (
    <>
      <Divider />
      <Table
        columns={columns}
        dataSource={listCodeSale}
        pagination={false}
      />
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Pagination
          total={page}
          pageSize={filter.limit}
          current={filter.page}
          onChange={(page, pageSize) => handleChangePagination(page, pageSize)}
        />
      </div>
    </>
  );
}

export default TableCodeSale;
