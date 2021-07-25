import React, { useState } from 'react';

import SwiperComponent from '../../components/Swiper/SwiperComponent'


import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";

import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper.min.css";


import { selectMovie , getMovieAsync} from '../../features/movie/movieSlice';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import API from 'api';
import './style.css'
import { Typography } from '@material-ui/core';

SwiperCore.use([Pagination, Navigation]);


export default function Hot(){
    const dispatch = useDispatch();
    let moviesList = useSelector(selectMovie);
    const [listSale, setListSale] = useState([]);
    let data =[];
    let temp = [];
    let tempp= [];
    if(moviesList.length <1 ){
      dispatch(getMovieAsync());
    }
    useEffect(() => { 
      async function fetchData() {
        const getUserAPI = '/bookingRevenueMovie';
        API.get(getUserAPI).then((res) => {
          setListSale(res.data);
        })
      }
        fetchData();
    }, []);
    const getMovieById = '/movie/';
    for(let i = 0 ; i <listSale.length;i++)
    {
        temp.push(listSale[i].MovieId);
    }
    function count(arr) {
      return arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), [])
    }
    let countMovieId = count(temp);
    for(let i = 0;i<countMovieId.length;i++)
    {
      if(countMovieId[i]>10)
        API.get(getMovieById+i).then((res) => {
          tempp.push(res.data);
        })
    }
    moviesList = moviesList.map((moviesList)=>{
       data.push(moviesList);
    })
    console.log(data);
    return(
        <div className="col-lg-12">
            {data && Object.values(data).length > 0 && (
                <div className="article-section padding-bottom">
                  
                  <Typography className="section-header-1" color="inherit">
                    <h2 className="title">Hot</h2>
                  </Typography>
                  <Swiper                 
                    navigation
                    pagination
                    slidesPerView={4}
                    spaceBetween={0}
                    allowTouchMove={true}
                    lazy={true}
                    slidesPerGroup={4}
                  >
                    {data &&
                      data.map((item, index) => ( 
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