import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import API from 'api';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton'

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css'


export default function BookingPage()
{

  let {id} = useParams();

  const [showtime, setShowtime] = useState([]);

  useEffect(() => { 
    async function fetchData() {
      const getUserAPI = `/showtime/${id}/movie`;
      
      API.get(getUserAPI).then((res) => {
        setShowtime(res.data);
      })
    }
      fetchData();
  }, []);
  
  console.log("this is showtime:" ,showtime);

    return(
      <div className="booking">
        <button className="btn-seat">A</button>


      </div>
    )
} 