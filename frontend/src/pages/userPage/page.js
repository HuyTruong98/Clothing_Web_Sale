import React from 'react';
import RouterPageUser from '../../routers/userRouter/router';

function UserPage({ account_current, listCartCustomer }) {
  return (
    <div>
      <RouterPageUser account_current={account_current} listCartCustomer={listCartCustomer} />
    </div>
  );
}

export default UserPage;