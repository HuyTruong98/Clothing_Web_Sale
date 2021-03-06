/* eslint-disable array-callback-return */
import React from 'react';
import { List, Avatar, Comment, Rate, Popconfirm } from 'antd';
import * as Message from '../../../../constants/Message';

function ListComment({ listComments, account_current, productId, onDelete, onEdit }) {
  const account = account_current.user ? account_current.user : account_current;

  function confirm(id) {
    onDelete(id);
  }
  return (
    <div style={{ marginTop: '30px', marginLeft: '30px' }}>
      <List
        itemLayout="horizontal"
        dataSource={listComments}
        renderItem={(item) => (
          item.productId === productId._id
            ?
            (
              <List.Item>
                <Comment
                  actions={[
                    <>
                      {
                        account.id === item.accountId
                          ?
                          (
                            <>
                              <Popconfirm
                                placement="topRight"
                                title={Message.BAN_CO_MUON_XOA}
                                onConfirm={() => confirm(item._id)}
                                okText="Yes"
                                cancelText="No"
                              >
                                <span >Xóa</span>
                              </Popconfirm>
                              <span onClick={() => onEdit(item._id)}>Sửa</span>
                            </>
                          )
                          :
                          ""
                      }
                    </>
                  ]}
                  author={
                    <p style={{ fontSize: '15px' }}>{item.account_name}</p>
                  }
                  avatar={
                    <Avatar style={{ background: '#f56a00' }}>
                      {
                        item.account_name.slice(0, 1)
                      }
                    </Avatar>
                  }
                  content={
                    <>
                      <p>{item.comment}</p>
                      <Rate allowHalf disabled value={item.rate} />
                    </>
                  }
                  datetime={
                    <span>{new Date(item.createdAt).toISOString().substring(0, 10)}</span>
                  }
                />
              </List.Item>

            )
            :
            ''
        )}
      />
    </div>
  );
}

export default ListComment;
