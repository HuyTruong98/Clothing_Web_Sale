/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Card, Skeleton, Space } from 'antd';

function SkeletonBestSeller(props) {
  return (
    <>
      <div className="row">
        <div className="col-xl-3 col-lg-3 col-lg-6 col-lg-12">
          <Card
            bordered={false}
            style={{ width: 250, marginRight: '25px', marginBottom: '80px' }}
            cover={
              <img src="https://www.trianglelearningcenter.org/wp-content/uploads/2020/08/placeholder.png" width="100%" height="100%" />
            }
          >
            <Skeleton active paragraph={{ rows: 2 }} />
          </Card>
        </div>
        <div className="col-xl-3 col-lg-3 col-lg-6 col-lg-12">
          <Card
            bordered={false}
            style={{ width: 250, marginRight: '25px', marginBottom: '80px' }}
            cover={
              <img src="https://www.trianglelearningcenter.org/wp-content/uploads/2020/08/placeholder.png" width="100%" height="100%" />
            }
          >
            <Skeleton active paragraph={{ rows: 2 }} />
          </Card>
        </div>
        <div className="col-xl-3 col-lg-3 col-lg-6 col-lg-12">
          <Card
            bordered={false}
            style={{ width: 250, marginRight: '25px', marginBottom: '80px' }}
            cover={
              <img src="https://www.trianglelearningcenter.org/wp-content/uploads/2020/08/placeholder.png" width="100%" height="100%" />
            }
          >
            <Skeleton active paragraph={{ rows: 2 }} />
          </Card>
        </div>
        <div className="col-xl-3 col-lg-3 col-lg-6 col-lg-12">
          <Card
            bordered={false}
            style={{ width: 250, marginRight: '25px', marginBottom: '80px' }}
            cover={
              <img src="https://www.trianglelearningcenter.org/wp-content/uploads/2020/08/placeholder.png" width="100%" height="100%" />
            }
          >
            <Skeleton active paragraph={{ rows: 2 }} />
          </Card>
        </div>
        <div className="col-xl-3 col-lg-3 col-lg-6 col-lg-12">
          <Card
            bordered={false}
            style={{ width: 250, marginRight: '25px', marginBottom: '80px' }}
            cover={
              <img src="https://www.trianglelearningcenter.org/wp-content/uploads/2020/08/placeholder.png" width="100%" height="100%" />
            }
          >
            <Skeleton active paragraph={{ rows: 2 }} />
          </Card>
        </div>
        <div className="col-xl-3 col-lg-3 col-lg-6 col-lg-12">
          <Card
            bordered={false}
            style={{ width: 250, marginRight: '25px', marginBottom: '80px' }}
            cover={
              <img src="https://www.trianglelearningcenter.org/wp-content/uploads/2020/08/placeholder.png" width="100%" height="100%" />
            }
          >
            <Skeleton active paragraph={{ rows: 2 }} />
          </Card>
        </div>
        <div className="col-xl-3 col-lg-3 col-lg-6 col-lg-12">
          <Card
            bordered={false}
            style={{ width: 250, marginRight: '25px', marginBottom: '80px' }}
            cover={
              <img src="https://www.trianglelearningcenter.org/wp-content/uploads/2020/08/placeholder.png" width="100%" height="100%" />
            }
          >
            <Skeleton active paragraph={{ rows: 2 }} />
          </Card>
        </div>
        <div className="col-xl-3 col-lg-3 col-lg-6 col-lg-12">
          <Card
            bordered={false}
            style={{ width: 250, marginRight: '25px', marginBottom: '80px' }}
            cover={
              <img src="https://www.trianglelearningcenter.org/wp-content/uploads/2020/08/placeholder.png" width="100%" height="100%" />
            }
          >
            <Skeleton active paragraph={{ rows: 2 }} />
          </Card>
        </div>
      </div>
    </>
  );
}

export default SkeletonBestSeller;
