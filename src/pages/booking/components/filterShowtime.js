import API from 'api';

import { Nav, Dropdown, } from "react-bootstrap";

import '../styles.css'
import { useEffect, useState } from 'react';

export function FilterShowtime(id,setSelectedShowtimeMain){
    const [showtime, setShowtime] = useState([]);
    const [fShowtime, setFShowtime] = useState([]);
    const [selectedDay, setSelectedDay] = useState();
    const [selectedCineplex, setSelectedCineplex] = useState();
    const [selectedCinema, setSelectedCinema] = useState();
    let uniCineplex = [];
    let uniCinema = [];
    let uniDateTime = [];

    useEffect(() => { 
        async function fetchData() {
        const getUserAPI = `/showtime/${id}/movie`;
        API.get(getUserAPI).then((res) => {
            res.data = res.data.sort((a,b)=> new Date(a.DateShow) - new Date(b.DateShow));
            setShowtime(res.data);
            let curDate = new Date();
            let filter = res.data.filter((item)=>{
              let dateShow = new Date(item.DateShow);
              return curDate.getTime() <= dateShow.getTime();
            })
            setFShowtime(filter);
        })
        }
        fetchData()
    }, [id]);

    useEffect(() => { 
        async function filteredData(){
          let filteredShowTime = showtime;
          if(selectedDay){
            let selectedDayClone = new Date(selectedDay);
            filteredShowTime = showtime.filter(st=>{
              let dateShow = new Date(st.DateShow);
              return dateShow.getTime() === selectedDayClone.getTime() ? st: "";
            })
            setSelectedCineplex({name:'cineplexes'});
            setSelectedCinema({name:'Cinemas'});
          }
          setFShowtime(filteredShowTime);
          
        }
        filteredData()
    }, [selectedDay,showtime]);
    showtime.map(x => uniDateTime.filter(a => a.DateShow === x.DateShow).length > 0 ? null : uniDateTime.push(x));
    const DateShow = uniDateTime.map((ite)=>
    {
        return(
        <Dropdown.Item key={ite.DateShow}onClick={(e) => {
            setSelectedDay(ite.DateShow);
        }}>
            {ite.DateShow}
        </Dropdown.Item>
        )
    });

    fShowtime.map(x => uniCineplex.filter(a => a.CineplexId === x.CineplexId).length > 0 ? null : uniCineplex.push(x));
    const cineplexes = uniCineplex.map((cineplex)=>{
        return(
        <Dropdown.Item key={cineplex.CineplexId} onClick={(e) => {
            setSelectedCineplex({id:cineplex.CineplexId,name:cineplex.CineplexName});
        }}>
            {cineplex.CineplexName}
        </Dropdown.Item>
        )
    });

    fShowtime.map(x => uniCinema.filter(a => a.CinemaId === x.CinemaId).length > 0 ? null : uniCinema.push(x));
    const cinemas = selectedCineplex ? uniCinema.map((cinema)=>{
      if(cinema.CineplexId === selectedCineplex.id)
      return(
        <Dropdown.Item key={cinema.CinemaId} onClick={(e) => {
            setSelectedCinema({id:cinema.CinemaId,name:cinema.CinemaName});
        }}>
            {cinema.CinemaName}
        </Dropdown.Item>
      )
      else
      return null;
    }):<div>Please select cineplex</div>;

    const showtimes = selectedCinema ? fShowtime.map((showtime)=>{
      if(showtime.CinemaId === selectedCinema.id)
        return(
          <button key={showtime.id} className="btn-st" onClick={ (e) =>{setSelectedShowtimeMain(showtime); }}>
              <span>{showtime.TimeBegin}</span>
          </button>
        )
      else
      return null;
    }): <div style={{ color: 'white' }}>Please select cinema</div>;

    return(
      <>
        <div className=" col">
          <Dropdown as={Nav.item}>
            <Dropdown.Toggle               
              as={Nav.item}
              data-toggle="dropdown"
              id="dropdown-split-basic"
              className="mt-2"
              variant="dark"
            >
              {selectedDay? selectedDay:"Date Show"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {DateShow}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown as={Nav.item}>
            <Dropdown.Toggle
              as={Nav.item}
              data-toggle="dropdown"
              id="dropdown-split-basic"
              className="mt-2"
              variant="dark"
            >
              {selectedCineplex? selectedCineplex.name:"Cineplexes"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {cineplexes}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown as={Nav.item}>
            <Dropdown.Toggle
              as={Nav.item}
              data-toggle="dropdown"
              id="dropdown-split-basic"
              className="mt-2"
              variant="dark"
            >
              {selectedCinema? selectedCinema.name:"Cinemas"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {cinemas}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="col">
          {showtimes}
        </div>
      </>

    )
}