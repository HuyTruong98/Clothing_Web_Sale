import React from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import * as Message from '../../constants/Message';

function TableType({ listTypes, listCategory, onEdit, onDelete }) {
  const columns = [
    {
      title: 'Tên Category',
      dataIndex: 'name',
      width: '50%',
      fixed: 'left',
    },
    {
      title: 'Thuộc category',
      width: 150,
      fixed: 'right',
      dataIndex: 'categoryId',
      // eslint-disable-next-line no-use-before-define
      render: (record) => renderCategoryId(record),
    },
    {
      title: 'Chức năng',
      dataIndex: 'action',
      width: 150,
      fixed: 'right',
      // eslint-disable-next-line no-use-before-define
      render: (data, record) => actionRender(record),
    },
  ];

  function renderCategoryId(record) {
    // eslint-disable-next-line no-underscore-dangle
    return listCategory.filter((item) => item._id === record).length > 0 ?
      // eslint-disable-next-line arrow-body-style
      listCategory.filter((item) => item._id === record).map((item) => {
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
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <i
                onClick={() => {
                  // eslint-disable-next-line no-underscore-dangle
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

  return (
    <>
      <Divider />
      <Table
        columns={columns}
        dataSource={listTypes}
      />
    </>
  );
}

export default TableType;