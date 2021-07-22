import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import API from 'api';

import { Nav, Dropdown } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css'
import { Button } from 'bootstrap';


function analyzeData(showtime, selectedDay){
  let filteredShowTime = showtime;

  if(selectedDay){
    selectedDay = new Date(selectedDay);
    filteredShowTime = showtime.filter(st=>{
      let dateShow = new Date(st.DateShow);
      return dateShow.getDate() === selectedDay.getDate() ? st: "";
    })
  }
  return{filteredShowTime};
}

export default function BookingPage()
{
  let {id} = useParams();
  const [showtime, setShowtime] = useState([]);
  const [fShowtime, setFShowtime] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  const [selectedCineplex, setSelectedCineplex] = useState();
  const [selectedCinema, setSelectedCinema] = useState();

  const [selectedShowtime, setSelectedShowtime] = useState();
  
  useEffect(() => { 
    async function fetchData() {
      const getUserAPI = `/showtime/${id}/movie`;
      API.get(getUserAPI).then((res) => {
        setShowtime(res.data);
        setFShowtime(res.data);
      })
    }
      fetchData()
  }, []);

  useEffect(() => { 
    async function filteredData(){
      let {filteredShowTime} = await analyzeData(showtime, selectedDay, selectedCineplex, selectedCinema);
      setFShowtime(filteredShowTime);
    }
    filteredData()
  }, [selectedDay]);
  
  const item = showtime.map((ite)=>
  {
    return(
      <Dropdown.Item onClick={(e) => {
        setSelectedDay(ite.DateShow);
      }}>
          {ite.DateShow}
      </Dropdown.Item>
    )
  });


  let uniCineplex = [];
  fShowtime.map(x => uniCineplex.filter(a => a.CineplexId == x.CineplexId).length > 0 ? null : uniCineplex.push(x));
  const cineplexes = uniCineplex.map((cineplex)=>{
    return(
      <Dropdown.Item onClick={(e) => {
        setSelectedCineplex(cineplex.CineplexId);
      }}>
          {cineplex.CineplexName}
      </Dropdown.Item>
    )
  });


  let uniCinema = [];
  fShowtime.map(x => uniCinema.filter(a => a.CinemaId == x.CinemaId).length > 0 ? null : uniCinema.push(x));
  const cinemas = selectedCineplex ? uniCinema.map((cinema)=>{
    if(cinema.CineplexId === selectedCineplex)
    return(
      <Dropdown.Item onClick={(e) => {
        setSelectedCinema(cinema.CinemaId);
      }}>
          {cinema.CinemaName}
      </Dropdown.Item>
    )
  }):<div>Please select cineplex</div>;

  const showtimes = selectedCinema ? fShowtime.map((showtime)=>{
    if(showtime.CinemaId == selectedCinema)
    return(
      <button onClick={ (e) =>{setSelectedShowtime(showtime)} }>
          {selectedCinema}
          <br/>
          {showtime.id}
          <br/>
          {showtime.CineplexName}
          <br/>
          {showtime.CinemaName}
      </button>
    )

  }): <div>Please select cinema</div>;

  


  const renderSeatCode = () => 
  {
    if(selectedShowtime)
    {
    const vertical_size= selectedShowtime.Height;
    const arr = new Array(vertical_size * selectedShowtime.Width).fill("");
    const newArr = arr.map((elem, index) => 
    {
      const charI = String.fromCharCode(65 + ~~(index / selectedShowtime.Width));
      const number = ~~(index % selectedShowtime.Width) + 1;
      return { seat: `${charI}${number}`, available: false };
    });
    return newArr;}
  };


  const renderSeat = () => {
    if(renderSeatCode()!==undefined){
    return renderSeatCode().map((elm, _index) => {
      
      return (
      <div key={_index} style={{ width: `calc(100%/${selectedShowtime.Width} - 2rem)`, margin: "1rem" }}>
        <div class="single-seat">
          <span class="sit-num">{elm.seat}</span>
        </div>
      </div>)
    });}
  };

    return(
      <div className="booking">
        <div className="selected col">
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
                  <span className="d-lg-none ml-1">cineplexes</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {cineplexes}
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

        <div className="col">
          {showtimes}
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