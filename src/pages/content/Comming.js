import React from 'react';

import SwiperComponent from '../../components/Swiper/SwiperComponent'


import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";

import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper.min.css";


import { selectMovie , getMovieAsync} from '../../features/movie/movieSlice';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovies as listMovies } from "../../redux/action/movieAction";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './style.css'

SwiperCore.use([Pagination, Navigation]);

export default function Comming(){
    const dispatch = useDispatch();
    const moviesList = useSelector(selectMovie);
    const Loading = useSelector((state) => state.movie.isLoading);
    if(moviesList.length <1 ){
      dispatch(getMovieAsync());
    }
    console.log(moviesList)
    return(
        <div className="col-lg-12">
            {moviesList && Object.values(moviesList).length > 0 && (
                <div className="article-section padding-bottom">
                  <div className="section-header-1">
                    <h2 className="title">Now Playing</h2>
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