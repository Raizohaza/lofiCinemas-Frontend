import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import API from 'api';

import { Nav, Dropdown } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css'
import { Box } from '@material-ui/core';



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



function GetShowTimeSeat(cinema)
{
  
  //let bookedSeat = ticket.map(tic => tic.Seat);
  let Height = cinema.Height;
  let Width = cinema.Width;
  let CinemaSeat = {'row':[]};
  for (let index = 0; index < Height; index++) {
      let SeatChar = String.fromCharCode(65+index);
      for (let j = 0; j < Width; j++) 
      {
          const element = SeatChar + (j + 1);
          CinemaSeat.row.push(element);      
      }
  }
  return CinemaSeat;
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

  const test1 = showtime[1];

  const arr0 =[];
    

  const arr1=[];

  if(test1)
  {
      
    for(let i =0; i < test1.Height ; i++)
    {
        arr0.push(String.fromCharCode(65+i));
    }
   

    
    for(let i=0; i < test1.Width; i++){
        arr1.push(i+1);
    }
   
  }


  const seats = GetShowTimeSeat({Height: 12, Width: 12});

  console.log("arr0: ", arr0);
  console.log("arr1: ", arr1);

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

  const MapSeat = arr0.map((char) => {
    return(
      <div className="column">
        {char}
      </div>
    )
  })



  console.log("test1: ", test1);
  console.log("seat: ", seats);

  const renderSeatCode = () => 
  {
    if(test1)
    {
    const vertical_size= test1.Height;
    const arr = new Array(vertical_size * test1.Width).fill("");
    const newArr = arr.map((elem, index) => 
    {
      const charI = String.fromCharCode(65 + ~~(index / test1.Width));
      const number = ~~(index % test1.Width) + 1;
      return { seat: `${charI}${number}`, available: false };
    });
    return newArr;}
  };


  const renderSeat = () => {
    if(renderSeatCode()!==undefined){
    return renderSeatCode().map((elm, _index) => {
      
      return (
      <div key={_index} style={{ width: `calc(100%/${test1.Width} - 2rem)`, margin: "1rem" }}>
        <div class="single-seat">
          <span class="sit-num">{elm.seat}</span>
        </div>
      </div>)
    });}
  };

    return(
      <div className="booking">
        <div className="selected">
          <Dropdown as={Nav.Item}>
                <Dropdown.Toggle               
                  as={Nav.Link}
                  data-toggle="dropdown"
                  id="dropdown-67443507"
                  variant="default"
                  className="lepp"
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
                  className="lepp"
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
                  className="lepp"
                >
                  <span className="d-lg-none ml-1">Cinemas</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {cinemas}
                </Dropdown.Menu>
          </Dropdown>
        </div>

        <div class="screen-wrapper">
                <div class="seat-area couple">
                  <div class="seat-line">
                    {renderSeat()}
                  </div>
                </div>
        </div>
      
          

      </div>
    );
} 