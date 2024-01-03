import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import Markdown from "react-markdown";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "../assets/ImageCarousel.css";

export default function ImageCarousel({ children }) {
  children = children.split("\n").filter((child) => child !== "");

  const components = {
    p: "small",
  };

  // Loop through the children and if the child starts with #cap# then
  // add it to the previous {img} as {caption}
  const imageAndCaption = children.reduce((acc, child) => {
    if (child.startsWith("#cap#")) {
      acc[acc.length - 1] = {
        ...acc[acc.length - 1],
        caption: child.substring(5),
      };
    } else {
      acc.push({ img: child, caption: null });
    }
    return acc;
  }, []);

  function renderImageSlide(el) {
    return (
      <SwiperSlide key={el.img}>
        <img src={el.img} alt="alt" />
        <Markdown components={components} className="carousel-caption">
          {el.caption}
        </Markdown>
      </SwiperSlide>
    );
  }

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Pagination, EffectFade]}
        className="image-carousel"
        effect="fade"
        fadeEffect={{ crossFade: true }}
      >
        {imageAndCaption.map((el) => renderImageSlide(el))}
      </Swiper>
    </>
  );
}
