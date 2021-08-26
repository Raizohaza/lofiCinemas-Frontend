import React from 'react';

import SwiperComponent from '../../components/Swiper/SwiperComponent'


import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNowPlayingMovieAsync } from 'features/movie/movieSlice';

import "swiper/components/pagination/pagination.min.css";
import 'swiper/components/navigation/navigation.scss';
import "swiper/swiper.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.css'
import { Card } from '@material-ui/core';

SwiperCore.use([Pagination, Navigation]);

export default function Content(){

    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movie.nowPlaying);
    const isLoading = useSelector((state) => state.movie.isLoading);
    useEffect(() => {
      async function fn(){
        dispatch(getNowPlayingMovieAsync());
      }
      fn();
      }, [dispatch]);

    return(
      <div className="content">
         {isLoading ? (
              <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            ) : (
        <div className="col-lg-12">        
            {movies && Object.values(movies).length > 0 && movies.length > 0 && (
                <div className="article-section padding-bottom">
                  <div className="section-header-1">
                    <h2 className="title">Now Playing</h2>
                  </div>
                  <Swiper                 
                    navigation
                    pagination
                    slidesPerView={5}
                    spaceBetween={0}
                    allowTouchMove={true}
                    lazy={true}
                    slidesPerGroup={5}
                  >
                    {movies &&
                      movies.map((item, index) => (
                        <SwiperSlide 
                          key={index}                        
                        >
                          <Card className="root">
                              <SwiperComponent movie={item} />
                          </Card>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                  <div className="row mb-30-none justify-content-center"></div>
                </div>
              )}
        </div>
      )}
      </div>
            
        
    );
        
}