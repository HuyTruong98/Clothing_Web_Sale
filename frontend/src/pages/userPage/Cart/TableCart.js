/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import React from 'react';
import { Image, Button, Popconfirm } from 'antd';
import { BrowserRouter as Route, NavLink } from 'react-router-dom';
import * as API from '../../../constants/url';
import { QuestionCircleOutlined } from "@ant-design/icons";
import { renderMoney } from '../../../constants/renderConvert';
import { useDispatch } from 'react-redux';
import * as actCart from '../../../redux/actions/manageCustomerCart/actCustomerCart';
import * as Message from '../../../constants/Message';

function TableCart({ listCart, listColor }) {
  const dispatch = useDispatch();
  function renderQuantity(item) {
    return (
      <p style={{ marginTop: '3px', marginRight: '20px' }}>{item.quantily}</p>
    )
  }

  function renderColor(value) {
    const color = listColor.find((item) => item._id === value);
    return color ? color.name : ''
  }

  function onUpdateQuantity(item, quantily) {
    dispatch(actCart.actUpdateCart(item, quantily));
  }

  function showSubToTal(price, priceSale, quantily) {
    return renderMoney(priceSale !== 0 ? priceSale * quantily : price * quantily);
  }

  function onDeleteItem(item) {
    dispatch(actCart.deleteCart(item));
  }
  return (
    <>
      {
        listCart.map((itemCart, indexCart) => {
          return (
            <>
              <tr key={indexCart}>
                <td>
                  <a>
                    <NavLink
                      style={{ color: 'black' }}
                      to={{
                        pathname: `${API.PRODUCT}/${itemCart._id}`,
                      }}
                    >
                      {itemCart.name}
                    </NavLink>
                  </a>
                </td>
                <td><a>{itemCart.productCode}</a></td>
                <td>
                  {
                    Array.isArray(itemCart && itemCart.imgProduct) && itemCart.imgProduct.length > 0 && itemCart.imgProduct.map((itemImg, indexImg) => {
                      if (indexImg === 0) {
                        return (
                          <Image src={`${API.serverImg}/${itemImg.imgUrl}`} style={{ width: '100px', height: '120px' }} alt={itemImg} />
                        )
                      }
                    })
                  }
                </td>
                <td>{itemCart.size}</td>
                <td>{renderColor(itemCart.colorProductId)}</td>
                <td>{renderMoney(itemCart.priceSale !== 0 ? itemCart.priceSale : itemCart.price)}</td>
                <td>
                  <div className="up-down">
                    {
                      itemCart.quantily < 2 ?
                        <Button
                          disabled
                          style={{ marginRight: '20px' }}
                          onClick={() => onUpdateQuantity(itemCart, itemCart.quantily - 1)}
                        >
                          <i className="fa fa-minus" aria-hidden="true"></i>
                        </Button>
                        :
                        <Button
                          style={{ marginRight: '20px' }}
                          onClick={() => onUpdateQuantity(itemCart, itemCart.quantily - 1)}
                        >

                          <i className="fa fa-minus" aria-hidden="true"></i>
                        </Button>
                    }
                    {renderQuantity(itemCart)}
                    {/* <p style={{ marginTop: '3px', marginRight: '20px' }}>{item.soluong > 0 ? item.soluong : count}</p> */}
                    <Button onClick={() => onUpdateQuantity(itemCart, itemCart.quantily + 1)}>
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </Button>
                  </div>
                </td>
                <td>{showSubToTal(itemCart.price, itemCart.priceSale, itemCart.quantily)}</td>
                <td>
                  <Popconfirm
                    placement="topRight"
                    title={Message.BAN_CO_MUON_XOA}
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                    onConfirm={() => onDeleteItem(itemCart)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a>
                      <i
                        className="fas fa-trash-alt"
                        style={{ color: "red", fontSize: "20px" }}
                      ></i>
                    </a>
                  </Popconfirm>
                </td>
              </tr>
            </>
          );
        })
      }
    </>
  );
}

export default TableCart;
