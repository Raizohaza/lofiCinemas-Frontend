import React from "react";

import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper.min.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import API from 'api';
import './home.css'

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
 
  return(
    <div  >
    <h2 className="title">CHOOSE A CINEPLEX</h2>

           <div className="main_content">
           {cineplex.map((cineplex)=>
             <div  key={cineplex.id}>
                <div className="card"  >
                       <img src={cineplex.img} alt={cineplex.id}/>
                       <Link to={`detail/booking/${cineplex.id}`}>
                       <h2>{cineplex.name}</h2>
                       </Link>
                </div>
             </div>
             )};
           </div>
   </div>
    );     
}