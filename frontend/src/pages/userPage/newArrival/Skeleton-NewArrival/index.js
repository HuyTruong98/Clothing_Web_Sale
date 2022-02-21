/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Card, Skeleton, Space } from 'antd';

function SkeletonNewArrival(props) {
  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-12">
          <div className="card-item-skeleton">
            <div className="card-1-skeleton">
              {/* <Skeleton.Image style={{ width: 400 }} /> */}
              <img src="https://www.trianglelearningcenter.org/wp-content/uploads/2020/08/placeholder.png" width="100%" height="100%" />
              <Skeleton active paragraph={{ rows: 2 }} />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <Space>
            <div className="all-last-Tshirt">
              <Card
                style={{ width: 220 }}
                bordered={false}
                cover={
                  <img src="https://www.trianglelearningcenter.org/wp-content/uploads/2020/08/placeholder.png" width="100%" height="100%" />
                }
              >
                <Skeleton active paragraph={{ rows: 2 }} />
              </Card>
            </div>
          </Space>
          <Space>
            <div className="all-last-Tshirt">
              <Card
                style={{ width: 220 }}
                bordered={false}
                cover={
                  <img src="https://www.trianglelearningcenter.org/wp-content/uploads/2020/08/placeholder.png" width="100%" height="100%" />
                }
              >
                <Skeleton active paragraph={{ rows: 2 }} />
              </Card>
            </div>
          </Space>
          <Space>
            <div className="all-last-Tshirt">
              <Card
                style={{ width: 220 }}
                bordered={false}
                cover={
                  <img src="https://www.trianglelearningcenter.org/wp-content/uploads/2020/08/placeholder.png" width="100%" height="100%" />
                }
              >
                <Skeleton active paragraph={{ rows: 2 }} />
              </Card>
            </div>
          </Space>
          <Space>
            <div className="all-last-Tshirt">
              <Card
                style={{ width: 220 }}
                bordered={false}
                cover={
                  <img src="https://www.trianglelearningcenter.org/wp-content/uploads/2020/08/placeholder.png" width="100%" height="100%" />
                }
              >
                <Skeleton active paragraph={{ rows: 2 }} />
              </Card>
            </div>
          </Space>
        </div>
      </div>
    </>
  );
}

export default SkeletonNewArrival;
