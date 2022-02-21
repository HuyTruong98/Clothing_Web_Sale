/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-var */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-children-prop */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as dataMenu from './dataMenu';

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        return (
          <Link className="collapse-item" to={to}>
            {label}
          </Link>
        );
      }}
    />
  );
};

function renderMenu(menusList) {
  var result = null;
  if (menusList.length > 0) {
    result = menusList.map((item, index) => {
      return (
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target={`#collapseTwo${index}`}
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            {/* <i className="fas fa-fw fa-cog"></i> */}
            <span>{item.title}</span>
          </a>
          <div
            id={`collapseTwo${index}`}
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Chức năng</h6>
              {item.menu.map((menu, index2) => {
                return (
                  <MenuLink
                    key={index2}
                    label={menu.name}
                    to={menu.to}
                    activeOnlyWhenExact={menu.exact}
                  />
                );
              })}
            </div>
          </div>
        </li>
      );
    });
  }
  return result;
}

export default function MenuConfig() {
  const account_current = useSelector((state) => state.manageLogin.account_current);
  return <>{renderMenu(dataMenu.menuListAdmin)}</>;
}
