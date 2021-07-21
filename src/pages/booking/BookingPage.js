import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import API from 'api';

import { Nav, Dropdown } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css'

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
  
  const item = showtime.map((ite)=>{
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
      <div >
          {selectedCinema}
          <br/>
          {showtime.id}
          <br/>
          {showtime.CineplexName}
          <br/>
          {showtime.CinemaName}
      </div>
    )

  }): <div>Please select cinema</div>;


    return(
      <div className="booking">
        <div className="selected col">
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
                  className="m-0"
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
      </div>
    );
} 