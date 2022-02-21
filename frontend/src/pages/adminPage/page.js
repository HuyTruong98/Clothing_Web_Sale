import React, { useState } from "react";
import MenuLeft from './Menu&NavBar/Menuleft';
import Nav from './Menu&NavBar/nav';

function Page({ account_current }) {
  const [checkToogle, setCheckToogle] = useState(true);
  const [colorMenu, setColorMenu] = useState(true);

  function onToogleMenu() {
    setCheckToogle(!checkToogle);
  }

  function onSetColorMenu() {
    setColorMenu(!colorMenu);
  }

  return (
    <div id="page-top">
      <div id="wrapper">
        <MenuLeft
          checkToogle={checkToogle}
          colorMenu={colorMenu}
        />
        {/* nội dung */}
        <Nav
          onToogleMenu={onToogleMenu}
          checkToogle={checkToogle}
          onSetColorMenu={onSetColorMenu}
          colorMenu={colorMenu}
          account_current={account_current}
        />
      </div>
    </div>
  );
}

export default Page;
