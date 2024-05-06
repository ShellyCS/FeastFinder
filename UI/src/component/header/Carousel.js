import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import car1 from "../../assets/car1.jpg";
import car2 from "../../assets/car2.jpg";
import car4 from "../../assets/car4.jpg";
import car5 from "../../assets/car5.jpg";
import car6 from "../../assets/car6.jpg";

const Carousel = () => {
  const data = [
    {
      imageUrl: car1,
    },
    {
      imageUrl: car2,
    },
    {
      imageUrl: car4,
    },
    {
      imageUrl: car5,
    },
    {
      imageUrl: car6,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className="w-3/4 m-auto">
      <div className="mt-20">
        <Slider {...settings}>
          {data.map((d) => (
            <div
              key={d.title}
              className="bg-white h-[450px] text-black rounded-xl"
            >
              <img src={d.imageUrl} alt="" className="" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
