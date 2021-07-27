import React from "react";

import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper.min.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import API from 'api';
import './home.css'

import SwiperComponent from '../../components/Swiper/SwiperComponent'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import { useSelector, useDispatch } from "react-redux";
import { getMovies as listMovies } from "../../redux/action/movieAction";

import './style.css'
const cineplex = [
  {
    id: 1,
    name:'Brad Path  Cgv',
    img:"https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/11/xem-phim-o-rap-giup-ban-thuong-thuc-tron-ven-bo-phim.png"
  },
  {
    id: 2,
    name:'Monserrat Lodge Galaxy',
    img: "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/11/xem-phim-o-rap-giup-ban-thuong-thuc-tron-ven-bo-phim.png"
  },
  {
    id: 5,
    name:'sd56754a',
    img: "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/11/xem-phim-o-rap-giup-ban-thuong-thuc-tron-ven-bo-phim.png"
  },
  {
    id: 7,
    name:'sddsad',
    img: "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/11/xem-phim-o-rap-giup-ban-thuong-thuc-tron-ven-bo-phim.png"
  },
  {
    id: 8,
    name:'sasada',
    img: "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/11/xem-phim-o-rap-giup-ban-thuong-thuc-tron-ven-bo-phim.png"
  },
  {
    id: 3,
    name:'Brown Crescent  Cgv',
    img: "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/11/xem-phim-o-rap-giup-ban-thuong-thuc-tron-ven-bo-phim.png"
  }
];
export default function Cineplex(props){
 
  useEffect(() => { 
    async function fetchData() {
      const getUserAPI = `/cineplexes`;
      API.get(getUserAPI).then((res) => {
        console.log(res.data);
      
      })
    }
      fetchData()
  }, []);

  function handleClick() {
    <Link to='/booking'></Link>
  }
 
  return(
      
                    <Swiper                 
                    navigation
                    pagination
                    slidesPerView={3}
                    spaceBetween={0}
                    allowTouchMove={true}
                    lazy={true}
                    slidesPerGroup={1}>

                
                    {cineplex.map(user=>(
                      <SwiperSlide key={user.id}>
                        
                       
                        <div className="swipercomponent">
      {user && (
        <div className="movie-grid">
          <div className="movie-thumb c-thumb">
            <Link to={`detail/booking/${user.id}`}>
              <img src={user.img} alt="movie" />
              
            </Link>
          </div>
          <div className="movie-content bg-one">
            <h5 className="title">
              <Link className="text-align" to={`detail/booking/${user.id}`}>{user.name}</Link>
            </h5>
          </div>
        </div>
      )}
    </div>
                        
                      </SwiperSlide>
                    ))}

                  </Swiper> 
          
  );     
}