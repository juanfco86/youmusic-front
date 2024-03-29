import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../../../index.css"
import { Pagination } from "swiper";
import { v4 as uuidv4 } from 'uuid';
import '../Slider.css'
import PlaylistCard from "../../Card/PlaylistCard/PlaylistCard";

export default function SearchSliderPlaylist({ array, title, size, slidesPerView, img, breakpoints, filter }) {


    return (
        <>
            <h2>{title}</h2>

            <Swiper
                slidesPerView={slidesPerView}
                spaceBetween={12}
                breakpoints={breakpoints}
                modules={[Pagination]}
                className="mySwiper"
            >

                <div className="row">

                    {array.filter((items) => {
                        if (!filter) return true;
                        else {
                            const itemName = items.name.toLowerCase()
                            return itemName.includes(filter.toLocaleLowerCase())
                        }
                    })
                        .map((data) => {
                            return (
                                <SwiperSlide key={uuidv4()}>
                                    <PlaylistCard
                                        data={data}
                                        size={size}
                                        img={img}
                                        slidesPerView={slidesPerView}
                                        breakpoints={breakpoints}
                                    />
                                </SwiperSlide>
                            )

                        })}



                </div>
            </Swiper>
        </>
    );
}