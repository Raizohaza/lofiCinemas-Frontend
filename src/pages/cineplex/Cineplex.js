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
    id: 10,
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
    <div  >
    <h2 className="title">CHOOSE A CINEPLEX</h2>

           <div className="main_content">
           {cineplex.map((user)=>
             <div  key={user.id}>
                <div className="card"  >
                       <img src={user.img}/>
                       <Link to={`detail/booking/${user.id}`}>
                       <h2>{user.name}</h2>
                       </Link>
                </div>
             </div>
             )};
           </div>
   </div>
    );     
}