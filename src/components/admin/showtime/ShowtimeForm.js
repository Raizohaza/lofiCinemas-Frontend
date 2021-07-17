import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {Dropdown,ButtonGroup} from 'react-bootstrap';
import { selectCinema } from '../../../features/cinema/cinemaSlice';
import { selectMovie } from '../../../features/movie/movieSlice';
export function ShowtimeForm(curr,action) {
    const dispatch = useDispatch();
    let history = useHistory();
    const [TimeBegin, setTimeBegin] = useState(curr.TimeBegin);
    const [DateShow, setDateShow] = useState(curr.DateShow);
    const [Price, setPrice] = useState(curr.Price);
    const [CinemaId, setCinemaId] = useState(curr.CinemaId);
    const [MovieId, setMovieId] = useState(curr.MovieId);
    const cinemaList = useSelector(selectCinema);
    const [CinemaName, setCinemaName] = useState("");
    const movieList = useSelector(selectMovie);
    const [MovieName, setMovieName] = useState("");
    let dropdownItem = cinemaList.map((Cinema)=>{
      return(
        <Dropdown.Item onClick = {(e)=>{
          e.preventDefault();
          setCinemaId(Cinema.id);
          setCinemaName(Cinema.Name);
        }}>
            {Cinema.Name}
        </Dropdown.Item>
      )
    });
    let dropdownItemMovie = movieList.map((Movie)=>{
      return(
        <Dropdown.Item onClick = {(e)=>{
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
         let data = {
            id: curr.id,
            TimeBegin: TimeBegin,
            DateShow : DateShow,
            Price : Price,
            CinemaId : CinemaId,
            MovieId : MovieId,
         }
         e.preventDefault();
         console.log(data);
         dispatch(action({...data}));
         history.push("/admin/showtime");   
       }
       }>
       <div className="row">
          <div className="col-lg-7">
             <div className="row">
                <div className="col-12 form-group">
                   <label htmlFor="TimeBegin">TimeBegin</label>
                   <input 
                      id="TimeBegin"
                      name="TimeBegin"
                      type="text" 
                      className="form-control" 
                      placeholder={TimeBegin}
                      value={TimeBegin}
                      onChange={e => setTimeBegin(e.target.value)}
                   />
                </div>
                <div className="col-12 form_gallery form-group">
                   <label htmlFor="DateShow">DateShow</label>
                   <input 
                      id="DateShow"
                      type="text" 
                      className="form-control" 
                      placeholder="DateShow" 
                      value={DateShow}
                      onChange={e => setDateShow(e.target.value)}
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
                        {dropdownItem}
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