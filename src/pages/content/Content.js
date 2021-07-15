import React from 'react';

import SwiperComponent from '../../components/Swiper/SwiperComponent'


import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";

import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper.min.css";



import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovies as listMovies } from "../../redux/action/movieAction";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './style.css'

SwiperCore.use([Pagination]);

export default function Content(){

    const dispatch = useDispatch();
    const { movies } = useSelector((state) => state.getMovies);
    useEffect(() => {
        dispatch(listMovies());
      }, [dispatch]);

    return(
        <div className="col-lg-12">
            {movies && Object.values(movies).length > 0 && movies.Movie.length > 0 && (
                <div class="article-section padding-bottom">
                  <div class="section-header-1">
                    <h2 class="title">Now Playing</h2>
                  </div>
                  <Swiper
                    pagination={true}
                    slidesPerView={4}
                    spaceBetween={10}
                    allowTouchMove={true}
                    lazy={true}
                    slidesPerGroup={4}
                  >
                    {movies.Movie &&
                      movies.Movie.map((item, index) => (
                        <SwiperSlide key={index}>
                          <SwiperComponent movie={item} />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                  <div class="row mb-30-none justify-content-center"></div>
                </div>
              )}
        </div>
            
        
    );
        
}