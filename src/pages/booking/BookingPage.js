import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import API from 'api';

import { Nav, Dropdown } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css'





function PhanTichData(showtime, selectedDay, selectedCineplex, selectedCinema){
  
  let st0 = [];  // showtime da duoc loc

  let plex = [];  // cineplex da duoc loc
  let ma = [];  // cinema da duoc loc



  for (let i = 0; i < showtime.length; i++) {
    let st = showtime[i];
    let dateShow = new Date(st.DateShow);
    console.log("dateshow :", dateShow);
    if(dateShow === selectedDay)
    {
        st0.push(st);
    }
  }

  for(let i =0; i < st0.length; i++)
  {
      let st = st0[i];
      if( st.CineplexName === selectedCineplex )
      {
        plex.push(st);
      }
  }

  for(let i =0; i < st0.length; i++)
  {
      let st = st0[i];
      if( st.CinemaName === selectedCinema )
      {
        ma.push(st);
      }
  }

  return {st0,plex,ma};  


}


export default function BookingPage()
{
  let {id} = useParams();

  const [showtime, setShowtime] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  const [selectedCineplex, setSelectedCineplex] = useState();
  const [selectedCinema, setSelectedCinema] = useState();

  useEffect(() => { 
    async function fetchData() {
      const getUserAPI = `/showtime/${id}/movie`;
      
      API.get(getUserAPI).then((res) => {
        setShowtime(res.data);
      })
    }
      fetchData();
  }, []);
  

  console.log(showtime);



  const item = showtime.map((ite)=>{
    return(
      <Dropdown.Item onclick={(e) => {


      }}>
          {ite.DateShow}
      </Dropdown.Item>
    )
  });

  const cineplexs = showtime.map((cineplex)=>{
    return(
      <Dropdown.Item>
          {cineplex.CineplexName}
      </Dropdown.Item>
    )
  });

  const cinemas = showtime.map((cinema)=>{
    return(
      <Dropdown.Item>
          {cinema.CinemaName}
      </Dropdown.Item>
    )
  });

    return(
      <div className="booking">
        <div className="selected">
          <Dropdown as={Nav.Item}>
                <Dropdown.Toggle
                  as={Nav.Link}
                  data-toggle="dropdown"
                  id="dropdown-67443507"
                  variant="default"
                  className="m-0"
                >
                  <span className="d-lg-none ml-1">Date Show</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {item}
                </Dropdown.Menu>
          </Dropdown>

          <Dropdown as={Nav.Item}>
                <Dropdown.Toggle
                  as={Nav.Link}
                  data-toggle="dropdown"
                  id="dropdown-67443507"
                  variant="default"
                  className="m-0"
                >
                  <span className="d-lg-none ml-1">Cineplexs</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {cineplexs}
                </Dropdown.Menu>
          </Dropdown>

          <Dropdown as={Nav.Item}>
                <Dropdown.Toggle
                  as={Nav.Link}
                  data-toggle="dropdown"
                  id="dropdown-67443507"
                  variant="default"
                  className="m-0"
                >
                  <span className="d-lg-none ml-1">Cinemas</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {cinemas}
                </Dropdown.Menu>
          </Dropdown>
        </div>

      </div>
    );
} 