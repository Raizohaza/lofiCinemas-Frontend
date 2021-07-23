import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import API from 'api';

import { Nav, Dropdown } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css'
import Checkout from './checkout';
import bookingSlice from 'features/booking/bookingSlice';

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
  const [bookedSeat, setBookedSeat] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState([]);
 
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

  useEffect(() => { 
    async function fetchData(){
      if(selectedShowtime){
        const getShowTimeAPI = `/showtime/${selectedShowtime.id}/seat`;
        API.get(getShowTimeAPI).then((res) => {
          setBookedSeat(res.data);
        });
      }
    }
    fetchData()
  }, [selectedShowtime]);
  
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
      <button onClick={ (e) =>{setSelectedShowtime(showtime); setSelectedSeat([])}}>
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

  //fix disabled,selected seat here
  const renderSeat = () => {
    if(renderSeatCode()!==undefined){
    return renderSeatCode().map((elm, _index) => {
      if(bookedSeat.includes(elm.seat)){
        return (
          <div key={_index} style={{ width: `calc(100%/${selectedShowtime.Width} - 2rem)`, margin: "1rem" }}>
            <div  className="single-seat ">
              <span onClick={()=>{
                console.log(elm.seat);
              }} className="sit-num ">disabled{elm.seat}</span>
            </div>
          </div>)
      }
      else if(selectedSeat.includes(elm.seat)){
        return (
          <div key={_index} style={{ width: `calc(100%/${selectedShowtime.Width} - 2rem)`, margin: "1rem" }}>
            <div  className="single-seat ">
            
              <span onClick={()=>{
                let arr = [];
                arr.push(...selectedSeat);
                arr = arr.filter(item => item !== elm.seat);
                setSelectedSeat(arr);
              }} className="sit-num ">selected{elm.seat}</span>
            </div>
          </div>)
      }
      else
      return (
        <div key={_index} style={{ width: `calc(100%/${selectedShowtime.Width} - 2rem)`, margin: "1rem" }}>
          <div className="single-seat">
            <span onClick={()=>{
              let arr = [];
              arr.push(...selectedSeat,elm.seat);
              setSelectedSeat(arr);
            }} className="sit-num ">{elm.seat}</span>
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


        <button onClick={()=>{
          let prices = selectedSeat.map(item =>45000);
          let data = {
            DateTime: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            UserId: localStorage.UID,
            ShowTimeId: selectedShowtime.id,
            Seats: selectedSeat,
            Price: prices
          }
            console.log(data);
            API.post('/booking/add',data).then(res => console.log(res.data));
           
        }}>
          Book
        </button>
        <div className="screen-wrapper">
                <div className="seat-area couple">
                  <div className="seat-line">
                    {renderSeat()}
                  </div>
                </div>
        </div>
        {selectedShowtime&&selectedCinema&&selectedCineplex?
          <Checkout/>:<></>
        }
      </div>
    );
} 