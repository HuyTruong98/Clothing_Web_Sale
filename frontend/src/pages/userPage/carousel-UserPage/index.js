/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actSliders from '../../../redux/actions/manageSlider/actManageSlider';
import * as ApiImg from '../../../constants/url';

function CarouselUserPage(props) {
  const dispatch = useDispatch()
  const listSliders = useSelector((state) => state.manageSliders.list);

  useEffect(() => {
    dispatch(actSliders.actFetchSlidersRequest());
  }, []);
  return (
    <>
      <div id="myCarousel" className="carousel slide border" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          {
            listSliders.map((itemSlider, indexSlider) => {
              if (indexSlider < 4) {
                return (
                  <>
                    {
                      indexSlider === 0
                        ?
                        (
                          <>
                            <div className="carousel-item active">
                              <img src={`${ApiImg.serverImg}/${itemSlider.imgSlider}`} className="d-block w-100" alt="photo" />
                            </div>
                          </>
                        )
                        :
                        (
                          <>
                            <div className="carousel-item">
                              <img src={`${ApiImg.serverImg}/${itemSlider.imgSlider}`} className="d-block w-100" alt="photo" />
                            </div>
                          </>
                        )
                    }
                  </>
                );
              }
            })
          }
        </div>
      </div>
    </>
  );
}

export default CarouselUserPage;