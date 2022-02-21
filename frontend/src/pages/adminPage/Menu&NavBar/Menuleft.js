/* eslint-disable no-unused-vars */
import React from "react";
import { Menu } from "antd";
import * as dataMenu from "../../../routers/adminRouter/dataMenu";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

const { SubMenu } = Menu;

function renderRouter(dataMenu, parentKey = 0) {
  return dataMenu.map((item, index) =>
    Array.isArray(item.children) && item.children.length > 0 ? (
      <SubMenu key={`${parentKey}-${index}`} title={item.name}>
        {renderRouter(item.children, `${parentKey}-${index}`)}
      </SubMenu>
    ) : (
      <Menu.Item key={`${parentKey}-${index}`}>
        <Link key={index} className="nav-link" to={item.to} exact={item.exact}>
          <i className="fas fa-fw fa-chart-area"></i>
          <span style={{ paddingLeft: '5px' }}>{item.name}</span>
        </Link>
      </Menu.Item>
    )
  );
}

function MenuLeft({ account_current, checkToogle, colorMenu }) {
  return (
    <>
      {checkToogle && (
        <Menu
          style={{
            width: 256,
            color: "Highlight",
            height: '130vh',
            boxShadow: ' 0px 0px 9px 1px #666',
          }}
          theme={`${colorMenu ? "dark" : "light "}`}
          mode="inline"
          collapsedWidth="100%"
        >
          {account_current?.role === "admin"
            ? renderRouter(dataMenu.menuListAdmin)
            : renderRouter(dataMenu.menuListAdmin)}
        </Menu>
      )}
    </>
  );
}

export default MenuLeft;
