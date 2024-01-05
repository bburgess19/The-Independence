import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "../../../assets/Gallery.css";
import { Link } from "react-router-dom";

export default function Gallery() {
  const [articleData, setArticleData] = useState(null);
  useEffect(() => {
    fetch("/featured.json")
      .then((response) => response.json())
      .then((data) => {
        setArticleData(data);
      })
      .catch((e) => {
        console.error("Could not fetch featured article data: " + e);
      });
  }, []);

  const renderImageSlide = (article) => {
    // Use text-position in article to append that style to .image-text
    let textPosition = article.text_position;

    return (
      <SwiperSlide key={article.slug}>
        <div id="gallery-image-wrapper">
          <img
            className="gallery-image"
            src={article.image_path}
            alt={article.alt}
          />
          <div className="image-text" style={{ gridArea: textPosition }}>
            <Link to={`/articles/${article.slug}`} className="image-header">
              <h1 className="gallery-article-title">{article.title}</h1>
            </Link>
          </div>
        </div>
        <Link to={`/articles/${article.slug}`} className="gallery-link">
          <span className="gradient-overlay"> </span>
        </Link>
      </SwiperSlide>
    );
  };

  return (
    <>
      <div id="gallery-wrapper">
        {articleData !== null && (
          <Swiper
            spaceBetween={10}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            navigation={true}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            modules={[Autoplay, Navigation, Pagination, EffectFade]}
            className="gallery-carousel"
          >
            {articleData.map((article) => renderImageSlide(article))}
          </Swiper>
        )}
      </div>
    </>
  );
}
