import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import image1 from '../../assets/images/pin/slider1 (1).jpeg'
import image2 from '../../assets/images/pin/slider2 (2).jpeg'
import image3 from '../../assets/images/pin/slider3 (3).jpeg'
import image4 from '../../assets/images/pin/slider4 (4).jpeg'
import image5 from '../../assets/images/pin/s1.jpeg'
import image6 from '../../assets/images/pin/s2.jpeg'
import image7 from '../../assets/images/pin/s3.jpeg'
import image8 from '../../assets/images/pin/s4.jpeg'
import image9 from '../../assets/images/pin/s5.jpeg'
import image10 from '../../assets/images/pin/s6.jpeg'
import image11 from '../../assets/images/pin/s7.jpeg'

interface Brand {
  _id: string;
  name: string;
  description?: string;
  image?: { secure_url: string };
}

export default function MainSlider() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11];

  useEffect(() => {
    try {
      
      if(localStorage.getItem("authorization")){
      axios
        .get("https://project1-kohl-iota.vercel.app/brand", {
          headers: { Authorization: localStorage.getItem("authorization") || "" },
        })
        .then((res) => setBrands(res.data.brands))
        .catch(() => setBrands([]))
        .finally(() => setIsLoading(false));
        console.log(brands)
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }finally {
      setIsLoading(false);
    }
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center px-6 py-10">
        {/* Placeholder for Slider */}
        <div className="relative">
          <div className="h-[350px] bg-gray-300 animate-pulse rounded-2xl"></div>
        </div>

        {/* Placeholder for Static Images */}
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-44 bg-gray-300 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center px-6 py-10">
      {/* Slider */}
      <div className="">
        <Slider {...settings}>
          {images.map((i) => (
            <div key={i} className="h-[350px] flex items-center justify-center">
              <div className="flex w-full h-full rounded-2xl  ">
                <div className="w-[100%] h-[350px] flex items-center justify-center ">
                  <img
                    src={i}
                    className="w-full rounded-2xl h-full border-0 bg-cover bg-center border-yellow-900 shadow-xl object-cover transition-transform duration-500 hover:scale-105"
                    alt={""}
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
        {/* Decorative Glow */}
       
      </div>

      {/* Static Images */}
      <div className="grid grid-cols-2 gap-4">
        <img
          src={image1}
          alt="Static 1"
          className="w-full h-44 object-cover rounded-lg shadow-md"
        />
        <img
          src={image2}
          alt="Static 2"
          className="w-full h-44 object-cover rounded-lg shadow-md"
        />
        <img
          src={image3}
          alt="Static 3"
          className="w-full h-44 object-cover rounded-lg shadow-md"
        />
        <img
          src={image4}
          alt="Static 4"
          className="w-full h-44 object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}