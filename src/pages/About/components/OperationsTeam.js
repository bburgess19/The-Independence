import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../assets/OperationsTeam.css";
import { Keyboard, Navigation } from "swiper/modules";

export default function OperationsTeam({ operationsTeam }) {
  return (
    <div className="page-wrapper" id="operations-team-wrapper">
      <h1 id="operations-team-top-header">Operations Team</h1>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        keyboard={{ enabled: true }}
        navigation={true}
        modules={[Navigation, Keyboard]}
        id="operations-carousel"
      >
        {operationsTeam.map((member) => (
          <SwiperSlide key={member.name}>
            <div className="operations-image-wrapper">
              <img
                className="operations-image"
                src={member.profile_img}
                alt={member.name}
              />
            </div>
            <div className="operations-card-details">
              <h3 className="oparations-name">{member.name}</h3>
              <h4 className="operations-position">{member.position}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
