/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Slider from "react-slick";

export default function SlickImageUser(props) {
  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <Slider {...settings}>
        <div className="slick">
          <div className="caption-title">
            <a>T-SHIRT</a>
          </div>
          <div className="caption-img">
            <img src="https://bizweb.dktcdn.net/thumb/large/100/331/067/collections/4.png" width="100%" />
          </div>
        </div>
        <div className="slick">
          <div className="caption-title">
            <a>HOODIE</a>
          </div>
          <div className="caption-img">
            <img src="//bizweb.dktcdn.net/thumb/large/100/331/067/collections/3.png" width="100%" />
          </div>
        </div>
        <div className="slick">
          <div className="caption-title">
            <a>JACKET</a>
          </div>
          <div className="caption-img">
            <img src="//bizweb.dktcdn.net/thumb/large/100/331/067/collections/5.png" width="100%" />
          </div>
        </div>
        <div className="slick">
          <div className="caption-title">
            <a>PATNS</a>
          </div>
          <div className="caption-img">
            <img src="//bizweb.dktcdn.net/thumb/large/100/331/067/collections/1.png" width="100%" />
          </div>
        </div>
        <div className="slick">
          <div className="caption-title">
            <a>SƠ MI</a>
          </div>
          <div className="caption-img">
            <img src="//bizweb.dktcdn.net/thumb/large/100/331/067/collections/32132.png" width="100%" />
          </div>
        </div>
        <div className="slick">
          <div className="caption-title">
            <a>ACCESSORIES</a>
          </div>
          <div className="caption-img">
            <img src="//bizweb.dktcdn.net/thumb/large/100/331/067/collections/2-40865d8d-17e2-47a7-876b-f50e430b2b70.png" width="100%" />
          </div>
        </div>
      </Slider>
    </>
  );
}
