import React from 'react';

import SwiperComponent from '../../components/Swiper/SwiperComponent'


import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNowPlayingMovieAsync } from 'features/movie/movieSlice';

import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.css'

SwiperCore.use([Pagination, Navigation]);

export default function Content(){

    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movie.nowPlaying);
    useEffect(() => {
      async function fn(){
        dispatch(getNowPlayingMovieAsync());
      }
      fn();
      }, []);

    return(
        <div className="col-lg-12">
            {movies && Object.values(movies).length > 0 && movies.length > 0 && (
                <div className="article-section padding-bottom">
                  <div className="section-header-1">
                    <h2 className="title">Now Playing</h2>
                  </div>
                  <Swiper                 
                    navigation
                    pagination
                    slidesPerView={6}
                    spaceBetween={0}
                    allowTouchMove={true}
                    lazy={true}
                    slidesPerGroup={6}
                  >
                    {movies &&
                      movies.map((item, index) => (
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