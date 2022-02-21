import React from 'react';
import HoodieFirst from './Hoodie-First';
import HoodieFour from './Hoodie-Four';

function NewArrival({ match, newArrHoodie }) {
  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-12">
          <HoodieFirst newArrHoodie={newArrHoodie} />
        </div>
        <div className="col-lg-6 col-12">
          <HoodieFour newArrHoodie={newArrHoodie} />
        </div>
      </div>
    </>
  );
}

export default NewArrival;
