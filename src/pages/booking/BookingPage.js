import API from 'api';

import { Nav, Dropdown, ButtonGroup } from "react-bootstrap";
import Grid from '@material-ui/core/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css'
import { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
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
  let history = useHistory();
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
      <button className="btn-st" onClick={ (e) =>{setSelectedShowtime(showtime); setSelectedSeat([])}}>
          <p>Thông tin vé</p>
          <p>ID: {showtime.id}</p>
          <p>Ngày: {showtime.DateShow}</p>          
          <p>Cụm: {showtime.CineplexName}</p>        
          <p>Rạp: {showtime.CinemaName}</p>
          <p>Xuất chiếu: {showtime.TimeBegin}</p>
          <p className="chon-ghe">Chọn ghế</p>
      </button>
    )

  }): <div>Please select cinema</div>;


  console.log("this is showtime:", showtime);
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
              }} className="sit-num " style={{ background: "gray" }}>{elm.seat}</span>
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
              }} className="sit-num " style={{ background: "blue" }}>{elm.seat}</span>
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
          <div>
          <Dropdown as={Nav.item}>
                <Dropdown.Toggle               
                  as={Nav.item}
                  data-toggle="dropdown"
                  id="dropdown-split-basic"
                  className="mt-2"
                  variant="dark"
                >
                <span>Date Show</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {item}
                </Dropdown.Menu>
          </Dropdown>
          </div>

          <div>
            <Dropdown as={Nav.item}>
                  <Dropdown.Toggle
                    as={Nav.item}
                    data-toggle="dropdown"
                    id="dropdown-split-basic"
                    className="mt-2"
                    variant="dark"
                  >
                    <span>Cineplexes</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {cineplexes}
                  </Dropdown.Menu>
            </Dropdown>
          </div>

          <div>
            <Dropdown as={Nav.item}>
                  <Dropdown.Toggle
                    as={Nav.item}
                    data-toggle="dropdown"
                    id="dropdown-split-basic"
                    className="mt-2"
                    variant="dark"
                  >
                    <span>Cinemas</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {cinemas}
                  </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="col">
          {showtimes}
        </div>
        <div className="screen-wrapper">
                <div className="seat-area couple">
                  <div className="seat-line">
                    {renderSeat()}
                  </div>
                </div>
        </div>
        
        {selectedShowtime&&localStorage.UID && <button className="btn-book" onClick={()=>{
          let prices = selectedSeat.map(item =>45000);
          let sumPrice = 0;
          let Sum = selectedSeat.map(item => sumPrice+=45000);
          console.log(sumPrice);
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
            API.post('/booking/add',data).then(res =>{
              localStorage.setItem('DateTime',data.DateTime)
              localStorage.setItem('ShowTimeId',data.ShowTimeId)
              localStorage.setItem('Seats',data.Seats)
              localStorage.setItem('Price',sumPrice)
              console.log(res.data)
            });
            history.push('checkout');
          } 
        }>
        Đặt vé
        </button>}
        
      </div>
    );
}