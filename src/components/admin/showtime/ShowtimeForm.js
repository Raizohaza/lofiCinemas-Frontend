import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {Dropdown,ButtonGroup} from 'react-bootstrap';
import { getCinemaAsync, selectCinema } from '../../../features/cinema/cinemaSlice';
import { getMovieAsync, selectMovie } from '../../../features/movie/movieSlice';
import { getCineplexAsync, selectCineplex } from "features/cineplex/cineplexSlice";
import { getShowtimeAsync } from "features/showtime/showtimeSlice";
import DatePicker from "react-datepicker";
import moment from "moment";

export function ShowtimeForm(curr,action) {
   const dispatch = useDispatch();
   let history = useHistory();
   
   const [TimeBegin, setTimeBegin] = useState()//moment(curr.TimeBegin).format('h:mm:ss a'));
   const [DateShow, setDateShow] = useState();
   const [Price, setPrice] = useState(curr.Price);
   const [CinemaId, setCinemaId] = useState(curr.CinemaId);
   const [MovieId, setMovieId] = useState(curr.MovieId);
   const [CineplexId, setCineplexId] = useState(curr.CinenplexId);
   const [CineplexName, setCineplexName] = useState("");
   const cinemaList = useSelector(selectCinema);
   const [CinemaName, setCinemaName] = useState("");
   const movieList = useSelector(selectMovie);
   const [MovieName, setMovieName] = useState("");
   const cineplexList = useSelector(selectCineplex);

   
   useEffect(()=>{
      const fetchData = async ()=>{
         if(cineplexList.length < 1){
            dispatch(getCineplexAsync());
         }
         if(movieList.length < 1){
            dispatch(getMovieAsync());
         }
         if(cinemaList.length < 1){
            dispatch(getCinemaAsync());
         }
         let currDateTime = new Date(curr.DateShow + ' ' + curr.TimeBegin)? new Date(curr.DateShow + ' ' + curr.TimeBegin) : new Date();
         
         if(currDateTime.toString() !== "Invalid Date"){
            setTimeBegin(currDateTime);
            setDateShow(currDateTime);
         }
         
      }
      fetchData();
   },[dispatch]);
   let dropdownCineplex = cineplexList.map((cineplex)=>{
      return(
      <Dropdown.Item key={cineplex.id} onClick = {(e)=>{
         e.preventDefault();
         setCineplexId(cineplex.id);
         setCineplexName(cineplex.Name);
      }}>
            {cineplex.Name}
      </Dropdown.Item>
      )
   });
   let dropdownCinema = cinemaList.map((Cinema)=>{
      if(CineplexId && CineplexId === Cinema.CineplexId)
      return(
         <Dropdown.Item key={Cinema.id} onClick = {(e)=>{
            e.preventDefault();
            setCinemaId(Cinema.id);
            setCinemaName(Cinema.Name);
         }}>
            {Cinema.Name}
         </Dropdown.Item>
      )
      if(!(CineplexId))
      return(
         <Dropdown.Item key={Cinema.id} onClick = {(e)=>{
            e.preventDefault();
            setCinemaId(Cinema.id);
            setCinemaName(Cinema.Name);
         }}>
            {Cinema.Name}
         </Dropdown.Item>
      );
   });
   let dropdownItemMovie = movieList.map((Movie)=>{
   return(
      <Dropdown.Item key={Movie.id} onClick = {(e)=>{
         e.preventDefault();
         setMovieId(Movie.id);
         setMovieName(Movie.Name);
      }}>
         {Movie.Name}
      </Dropdown.Item>
   )
   });
   return(
      <form onSubmit={(e) => {
         e.preventDefault();
         let data = {
            id: curr.id,
            TimeBegin: moment(TimeBegin).format('h:mm:ss a'),
            DateShow : moment(DateShow).format('DD-MMM-YYYY'),
            Price : Price,
            CinemaId : CinemaId,
            MovieId : MovieId,
         }
         console.log(data);
         dispatch(action({...data}));
         setTimeout(() => {
            dispatch(getShowtimeAsync());
            history.push("/admin/showtime");  
         }, 100);
          
      }
      }>
      <div className="row">
         <div className="col-lg-7">
            <div className="row">
               <div className="col-12 form-group">
                  <label htmlFor="TimeBegin">TimeBegin</label>
                  <DatePicker
                     selected={TimeBegin}
                     placeholder="Not selected"
                     className="form-control"
                     onChange={(date) => setTimeBegin(date)}
                     showTimeSelect
                     showTimeSelectOnly
                     timeIntervals={15}
                     timeCaption="Time"
                     dateFormat="h:mm aa"
                  />
               </div>
               <div className="col-12 form_gallery form-group">
                  <label htmlFor="DateShow">DateShow</label>
                  <DatePicker
                     className="form-control"
                     placeholder="Not selected"
                     DatePicker 
                     selected={DateShow} 
                     onChange={(date) => setDateShow(date)} 
                  />
               </div>
               <div className="col-12 form_gallery form-group">
                  <label htmlFor="Price">Price</label>
                  <input 
                     id="Price"
                     type="text" 
                     className="form-control" 
                     placeholder="Price" 
                     value={Price}
                     onChange={e => setPrice(e.target.value)}
                  />
               </div>
               <div className="col-12 form_gallery form-group">
                  <label htmlFor="CineplexId">CineplexId</label>
                  <input 
                  disabled
                     id="CineplexId"
                     type="text" 
                     className="form-control" 
                     placeholder="CineplexId" 
                     value={CineplexName}
                     onChange={e => setCineplexId(e.target.value)}
                  />
                  <Dropdown as={ButtonGroup}>
                     <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                     <Dropdown.Menu>
                        {dropdownCineplex}
                     </Dropdown.Menu>
                  </Dropdown>
               </div>
               <div className="col-12 form_gallery form-group">
                  <label htmlFor="CinemaId">CinemaId</label>
                  <input 
                  disabled
                     id="CinemaId"
                     type="text" 
                     className="form-control" 
                     placeholder="CinemaId" 
                     value={CinemaName}
                     onChange={e => setCinemaId(e.target.value)}
                  />
                  <Dropdown as={ButtonGroup}>
                     <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                     <Dropdown.Menu>
                        {dropdownCinema}
                     </Dropdown.Menu>
                  </Dropdown>
               </div>
               <div className="col-12 form_gallery form-group">
                  <label htmlFor="MovieId">MovieId</label>
                  <input 
                  disabled
                     id="MovieId"
                     type="text" 
                     className="form-control" 
                     placeholder="MovieId" 
                     value={MovieName}
                     onChange={e => setMovieId(e.target.value)}
                  />
                  <Dropdown as={ButtonGroup}>
                     <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                     <Dropdown.Menu>
                        {dropdownItemMovie}
                     </Dropdown.Menu>
               </Dropdown>
               </div>
         </div>
         </div>
      </div>
      <div className="row">
      <div className="col-12 form-group ">
               <button type="submit" className="btn btn-primary">Submit</button>
               
               <button type="reset" className="btn btn-danger" onClick={()=>history.push("/admin/showtime")}>cancel</button>
         </div>
      </div>
   </form>
      );
 }