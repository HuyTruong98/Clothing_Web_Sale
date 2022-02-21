/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import NewArrivalFrist from './Tshirt-First/NewArrivalFrist';
import NewArrivalLast from './Tshirt-Four/NewArrivalLast';

function NewArrival({ match, newArrTshirt }) {

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-12">
          <NewArrivalFrist newArrTshirt={newArrTshirt} />
        </div>
        <div className="col-lg-6 col-12">
          <NewArrivalLast newArrTshirt={newArrTshirt} />
        </div>
      </div>
    </>
  );
}

export default NewArrival;
