import React from 'react';

import SwiperComponent from '../../components/Swiper/SwiperComponent'


import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";

import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper.min.css";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import { selectMovie , getMovieAsync} from '../../features/movie/movieSlice';
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
      dispatch(getMovieAsync());
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
                    slidesPerView={6}
                    spaceBetween={0}
                    allowTouchMove={true}
                    lazy={true}
                    slidesPerGroup={6}
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
