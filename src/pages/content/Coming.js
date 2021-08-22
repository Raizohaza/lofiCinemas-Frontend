import React from 'react';

import SwiperComponent from '../../components/Swiper/SwiperComponent'


import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";

import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper.min.css";
import 'swiper/components/navigation/navigation.scss';


import { selectMovie , getMovieAsync,getComingMovieAsync} from '../../features/movie/movieSlice';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovies as listMovies } from "../../redux/action/movieAction";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Card, CardMedia, Link } from '@material-ui/core';
import './style.css'
import { Movie } from '@material-ui/icons';
SwiperCore.use([Pagination, Navigation]);

export default function Coming(){
    const dispatch = useDispatch();
    let moviesList = useSelector(selectMovie);
    const Loading = useSelector((state) => state.movie.isLoading);
    let data =[];
    if(moviesList.length <1 ){
      dispatch(getComingMovieAsync());
    }
    moviesList = moviesList.map((moviesList)=>{
      if(moviesList.Status == "Comming Soon")
          data.push(moviesList);
    })
    return(
        <div className="col-lg-12">
            {data && Object.values(data).length > 0 && (
                <div className="article-section padding-bottom">
                  <div className="section-header-1">
                    <h2 className="title">Popular</h2>
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
                    {data &&
                      data.map((item, index) => ( 
                        <SwiperSlide key={index}>
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
            
        
    );
        
}
