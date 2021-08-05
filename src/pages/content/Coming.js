import React, { useEffect } from 'react';
import { getComingMovieAsync } from '../../features/movie/movieSlice';
import { useSelector, useDispatch } from "react-redux";

import SwiperComponent from '../../components/Swiper/SwiperComponent'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.css';
SwiperCore.use([Pagination, Navigation]);

export default function Coming(){
    const dispatch = useDispatch();
    let moviesList = useSelector((state) => state.movie.coming);
    const Loading = useSelector((state) => state.movie.isLoading);
    
    useEffect(()=>{
      async function fn(){
        dispatch(getComingMovieAsync());
      }
      fn();
      
    },[])
    return(
        <div className="col-lg-12">
            {moviesList && Object.values(moviesList).length > 0 && (
                <div className="article-section padding-bottom">
                  <div className="section-header-1">
                    <h2 className="title">Coming Soon</h2>
                  </div>
                  <Swiper                 
                    navigation
                    pagination
                    slidesPerView={4}
                    spaceBetween={0}
                    allowTouchMove={true}
                    lazy={true}
                    slidesPerGroup={4}
                  >
                    {moviesList &&
                      moviesList.map((item, index) => ( 
                        <SwiperSlide key={index}>
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