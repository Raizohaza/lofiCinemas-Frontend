import React from 'react';
import SwiperComponent from '../../components/Swiper/SwiperComponent'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper.min.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovies as listMovies } from "../../redux/action/movieAction";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.css'
import SwiperCore, { Pagination, Navigation } from "swiper/core";
SwiperCore.use([Pagination, Navigation]);

export default function Content2(){

    const dispatch = useDispatch();
    const { movies } = useSelector((state) => state.getMovies);
    useEffect(() => {
        dispatch(listMovies());
      }, [dispatch]);

    return(
        <div className="col-lg-12">
            {movies && Object.values(movies).length > 0 && movies.Movie.length > 0 && (
                <div className="article-section padding-bottom">
                  <div className="section-header-1">
                    <h2 className="title">Now Playing co css</h2>
                  </div>

                  <Swiper    
                    slidesPerView={5}
                    spaceBetween={0}
                    allowTouchMove={true}
                    lazy={true}
                    slidesPerGroup={2}
                    navigation pagination
                  >
                    {movies.Movie &&
                      movies.Movie.map((item, index) => (
                        <SwiperSlide 
                          key={index}                        
                        >
                          <SwiperComponent movie={item} />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                
                  <div className="row mb-30-none justify-content-center"></div>
                </div>
              )}
        </div>   
    );
        
}