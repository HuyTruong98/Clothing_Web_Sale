import React from 'react';
import { Table, Divider, Popconfirm, Image } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import * as Message from '../../constants/Message';
import * as Api from '../../constants/url';

function TableSlider({ listSliders, onEdit, onDelete }) {
  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'name',
      width: '50%',
      fixed: 'left',
      render: (data, record) => actionRenderImage(record)
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

  function actionRenderImage(record) {
    return (
      <Image
        style={{ width: '120px' }}
        src={`${Api.serverImg}/${record?.imgSlider}`}
      />
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
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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

  return (
    <>
      <Divider />
      <Table
        columns={columns}
        dataSource={listSliders}
      />
    </>
  );
}

export default TableSlider;