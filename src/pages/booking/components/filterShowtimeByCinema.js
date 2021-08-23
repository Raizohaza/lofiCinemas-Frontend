import API from 'api';

import { Nav, Dropdown, } from "react-bootstrap";

import '../styles.css'
import { useEffect, useState } from 'react';

export default function FilterShowtimeByCinema(id,setSelectedShowtimeMain){
    const [showtime, setShowtime] = useState([]);
    const [fShowtime, setFShowtime] = useState([]);
    const [selectedDay, setSelectedDay] = useState();

    const [selectedMovie, setSelectedMovie] = useState();

    let uniMovie = [];

    useEffect(() => { 
        async function fetchData() {
        const getUserAPI = `/showtime/${id}/cinema`;
        API.get(getUserAPI).then((res) => {
            res.data = res.data.sort((a,b)=> new Date(a.DateShow) - new Date(b.DateShow));
            setShowtime(res.data);
            setFShowtime(res.data);
        })
        }
        fetchData()
    }, []);

    useEffect(() => { 
        async function filteredData(){
          let filteredShowTime = showtime;
          if(selectedDay){
            let selectedDayClone = new Date(selectedDay);
            filteredShowTime = showtime.filter(st=>{
            let dateShow = new Date(st.DateShow);
            return dateShow.getDate() === selectedDayClone.getDate() ? st: "";
            })

            setSelectedMovie({name:'Movies'});
          }
          setFShowtime(filteredShowTime);
          
        }
        filteredData()
    }, [selectedDay]);
    
    const DateShow = showtime.map((ite)=>
    {
        return(
        <Dropdown.Item key={ite.DateShow}onClick={(e) => {
            setSelectedDay(ite.DateShow);
        }}>
            {ite.DateShow}
        </Dropdown.Item>
        )
    });

    fShowtime.map(x => uniMovie.filter(a => a.MovieId === x.MovieId).length > 0 ? null : uniMovie.push(x));
    const movies = fShowtime.map((movie)=>{
        return(
        <Dropdown.Item key={movie.MovieId} onClick={(e) => {
            setSelectedMovie({id:movie.MovieID,name:movie.MovieName});
        }}>
            {movie.MovieName}
        </Dropdown.Item>
        )
    });

    const showTimes = selectedMovie ? fShowtime.map((showtime)=>{
      if(showtime.MovieID === selectedMovie.id)
      return(
          <div className="col">
            <button key={showtime.id} className="btn-st" onClick={ (e) =>{setSelectedShowtimeMain(showtime); }}>
                <span>{showtime.MovieName}</span>
                <span>{showtime.TimeBegin}</span>
            </button>
          </div>
      )
  
    }): <div className="col">Please select cinema</div>;
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
              {selectedMovie? selectedMovie.name:"Movies"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {movies}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="row" style={{width:'75%'}}>
          {showTimes}
        </div>
      </>

    )
}