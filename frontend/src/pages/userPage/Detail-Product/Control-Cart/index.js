/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Tabs, Image, Form, Radio, Card, Space } from 'antd';
import { renderMoney } from '../../../../constants/renderConvert';
import * as actColor from '../../../../redux/actions/manageColor/actManageColor';
import * as actCartProduct from '../../../../redux/actions/manageCustomerCart/actCustomerCart';

function Control_Cart({ productId }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [changeColor, setChangeColor] = useState();
  const [count, setCount] = useState(1);
  const listColor = useSelector((state) => state.manageColor.list);

  function sizeForColor(e) {
    setChangeColor(e.target.value);
    setCount(1);
    form.setFieldsValue({
      size: undefined,
    });
  }

  function handleChangeSize(e) {
    setCount(1);
  }

  const unique = (arr) => {
    return Array.from(new Set(arr))
  }

  let arrColor = productId.sizeAndColorAndNumber.map((item, index) => {
    return item.colorProductId
  });
  
  let arrColorId = []
  listColor.map((item, index) => {
    if (unique(arrColor).includes(item._id)) {
      arrColorId.push(item)
    };
  });

  function addToCart(values) {
    values = {
      ...values,
      _id: productId._id,
      quantily: count,
      name: productId.name,
      categoryId: productId.categoryId,
      typeProductId: productId.typeProductId,
      price: productId.price,
      priceSale: productId.priceSale,
      imgProduct: productId.imgProduct,
      productCode: productId.productCode,
    }
    dispatch(actCartProduct.actCreateCart(values));
  }

  useEffect(() => {
    dispatch(actColor.actFetchColorsRequest());
  }, []);
  return (
    <>
      <Form
        layout="horizontal"
        form={form}
        name="basic"
        onFinish={(values) => addToCart(values)}
        initialValues={{ remember: true }}
      >
        <h1 className="title-product">{productId && productId.name}</h1>
        <div className="price-box">
          {
            productId && productId.priceSale > 0
              ?
              (
                <>
                  <strong>{renderMoney(productId && productId.priceSale)}</strong> &emsp;
                  <strike>{renderMoney(productId && productId.price)} <div className="percent-detail">-{Math.floor(100 - ((productId.priceSale) / (productId.price) * 100))}%</div></strike>
                </>
              )
              :
              (
                <>
                  <strong>{renderMoney(productId && productId.price)}</strong>
                </>
              )
          }
        </div>
        <div className="first-status">
          <p>Th????ng hi???u : &nbsp; <strong>Geeksforgeeks</strong></p>
        </div>
        <div className="second-status">
          <p>M?? s???n ph???m : &nbsp;<strong>{productId && productId.productCode}</strong> </p>
        </div>


        <Form.Item
          label="M??u"
          name="colorProductId"
          rules={[{ required: true, message: 'Vui l??ng ch???n m??u!' }]}
        >
          <Radio.Group size="middle" onChange={sizeForColor}>
            {
              arrColorId.map((itemColor) => {
                return (
                  <Radio.Button value={itemColor._id}>{itemColor.name}</Radio.Button>
                );
              })
            }

          </Radio.Group>
        </Form.Item>

        {
          !changeColor
            ?
            (
              <>
                <Form.Item
                  label="K??ch th?????c"
                >
                  <Radio.Group disabled size="middle">
                    <Radio.Button>S</Radio.Button>
                    <Radio.Button>M</Radio.Button>
                    <Radio.Button>L</Radio.Button>
                    <Radio.Button>S</Radio.Button>
                    <Radio.Button>XXL</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </>
            )
            :
            (
              <>
                <Form.Item
                  label="K??ch th?????c"
                  name="size"
                  rules={[{ required: true, message: 'Vui l??ng ch???n size!' }]}
                >
                  <Radio.Group size="middle" onChange={handleChangeSize}>
                    {
                      productId && Array.isArray(productId.sizeAndColorAndNumber)
                      && productId.sizeAndColorAndNumber.length > 0
                      && productId.sizeAndColorAndNumber.map((item) => {
                        if (item.colorProductId === changeColor) {
                          return (
                            <>
                              {
                                item.howNumber === 0
                                  ?
                                  <Radio.Button value={item.size} disabled>{item.size}</Radio.Button>
                                  :
                                  <Radio.Button value={item.size}>{item.size}</Radio.Button>
                              }
                            </>
                          );
                        }
                      })
                    }
                  </Radio.Group>
                </Form.Item>
              </>
            )
        }

        <div className="manageSize">
          <div className="numberCount">
            S??? l?????ng :
            <div className="up-down">
              {
                count < 2
                  ?
                  (
                    <Button disabled style={{ marginRight: '20px' }} onClick={() => setCount(count - 1)}>
                      <i className="fa fa-minus" aria-hidden="true"></i>
                    </Button>
                  )
                  :
                  (
                    <Button style={{ marginRight: '20px' }} onClick={() => setCount(count - 1)}>
                      <i className="fa fa-minus" aria-hidden="true"></i>
                    </Button>
                  )
              }
              <p style={{ marginTop: '3px', marginRight: '20px' }}>{count}</p>
              <Button onClick={() => setCount(count + 1)}>
                <i className="fa fa-plus" aria-hidden="true"></i>
              </Button>
            </div>
          </div>

          <div className="addToCart">
            <Button
              htmlType="submit"
              style={{ backgroundColor: '#ffac4b', marginTop: '20px', height: '60px', border: 'none' }}
            >
              <i style={{ fontSize: '30px' }} className="fa fa-shopping-cart" aria-hidden="true"></i>&emsp; <strong>Th??m v??o gi??? h??ng</strong>
            </Button>
          </div>
          <div className="phone-contact-1">
            <div className="phone-contact-title">
              <p>G???I ????? MUA H??NG NHANH H??N</p>
            </div>
            <div className="phone-contact-number">
              <div className="phone-icon"><i style={{ fontSize: '20px', paddingTop: '5px' }} className="fas fa-phone-volume" aria-hidden="true"></i></div>
              <div className="number-phone-contact"><strong>1800 1234</strong></div> &emsp;
              <p>Mi???n ph??</p>
            </div>
          </div>
          <div className="travel-fast">
            <img src="https://bizweb.dktcdn.net/100/331/067/themes/823156/assets/now1.png" />
            <b> GIAO SI??U T???C 2H <br />
              <font style={{ color: 'green', fontSize: '18px', paddingTop: '10px' }}> Giao nhanh 2H trong n???i th??nh:</font>  <br />
              <font style={{ color: 'orange', paddingTop: '10px' }}> TP.HCM, H?? N???I, ???? N???NG </font>
            </b>
          </div>
          <div className="travel-save">
            <img src="https://bizweb.dktcdn.net/100/331/067/themes/823156/assets/fast1.png" />
            <b> GIAO TI???T KI???M <br />
              <font style={{ color: 'green', fontSize: '18px', paddingTop: '10px' }}> Giao nhanh ti???t ki???m</font>  <br />
              <font style={{ color: 'orange', paddingTop: '10px', fontSize: '16px' }}> Th???i gian giao h??ng t??? 2-3 ng??y </font>
            </b>
          </div>
        </div>
      </Form>
    </>
  );
}

export default Control_Cart;
