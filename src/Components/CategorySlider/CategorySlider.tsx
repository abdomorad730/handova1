import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { toast } from "react-toastify";
import image1 from '../../assets/images/slider 1.jpeg';
export default function Categories() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getBrand() {
    try {
      const { data } = await axios.get(
        "https://project1-kohl-iota.vercel.app/brand",
        { headers: { Authorization: localStorage.getItem("authorization") } }
      );
      setImages(data.brands);
    } catch (error: any) {
      console.error("Error fetching brand:", error);
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem("authorization");
          localStorage.removeItem("role");
          window.location.href = "/login";
        } else if (error.response.status >= 500) {
          toast.error("Server error. Please try again later.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(localStorage.getItem("authorization")){
      getBrand();
    }
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  if (isLoading) {
    return (
      <div className="py-5 transition-colors duration-500 light:bg-white dark:bg-black px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-full aspect-[3/2] bg-gray-300 animate-pulse rounded-2xl"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-5 transition-colors duration-500 light:bg-white dark:bg-black px-4">
            
            <h2 className="font-bold text-center mb-10 dark:text-amber-500">
              All Brands
            </h2>
        <div className="container mx-auto">
          <Slider {...settings}>
            {images.map((img: any) => (
              <div key={img._id} className="px-2">
                <div className="relative w-full aspect-[3/2] overflow-hidden rounded-2xl shadow-lg group transition-all duration-300 hover:shadow-2xl">
                  <img
                    src={img.image?.secure_url?   img.image?.secure_url : image1 }
                    alt={img.name}
                    className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}