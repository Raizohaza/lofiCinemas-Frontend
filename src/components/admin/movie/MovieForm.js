import { getMovieAsync } from "features/movie/movieSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import './movie.css'

export function MovieForm(curr,action) {
    const dispatch = useDispatch();
    let history = useHistory();
    const [Name, setName] = useState(curr.Name);
    const [Poster, setPoster] = useState(curr.Poster);
    const [Trailer, setTrailer] = useState(curr.Trailer);
    const [Description, setDescription] = useState(curr.Description);
    const [ReleaseDate, setReleaseDate] = useState(curr.ReleaseDate);
    const [Duration, setDuration] = useState(curr.Duration);
    const [MID, setMID] = useState(curr.MID);
    return(
       <form onSubmit={(e) => {
         let data = {
            id: curr.id,
            Name: Name,
            Poster: Poster,
            Description: Description,
            ReleaseDate: ReleaseDate,
            Duration: Duration,
            Trailer:Trailer,
            MID:MID
         }
         e.preventDefault();
         dispatch(action({...data}));
         dispatch(getMovieAsync());
         history.push("/admin/table");
       }
       }>
       <div className="row">
          <div className="col-lg-7">
             <div className="row">
                <div className="col-12 form-group">
                   <p className="td1" htmlFor="Name">Name</p>
                   <input 
                      id="Name"
                      name="Name"
                      type="text" 
                      className="form-control" 
                      placeholder={Name}
                      value={Name}
                      onChange={e => setName(e.target.value)}
                   />
                </div>
                <div className="col-12 form_gallery form-group">
                   <p className="td1" htmlFor="Poster">Poster</p>
                   <input 
                      id="Poster"
                      type="text" 
                      className="form-control" 
                      placeholder="Poster" 
                      value={Poster}
                      onChange={e => setPoster(e.target.value)}
                   />
                </div>
                
                <div className="col-12 form-group">
                   <p className="td1" htmlFor="Description">Description</p>
                   <textarea 
                      id="Description" 
                      name="text" 
                      rows="5" 
                      className="form-control" 
                      placeholder="Description"
                      value={Description}
                      onChange={e => setDescription(e.target.value)}
                   />
                </div>
             </div>
          </div>          
          <div className="col-lg-5">
             <div className="d-block position-relative">
                <div className="form_video-upload">
                   <input 
                      type="text" 
                      value={Trailer}
                      onChange={e => {
                        e.target.value = e.target.value.replace("watch?v=","embed/");
                        setTrailer(e.target.value);
                      }}
                   />
                   <iframe title="Trailer" src={Trailer} width="420" height="315"/>
                   <p className="td1">Upload video</p>
                </div>
             </div>
          </div>
       </div>
       <div className="row">
          <div className="col-sm-7 form-group">
                <p className="td1" htmlFor="ReleaseDate">ReleaseDate</p>
                <input 
                   id="ReleaseDate"
                   type="text" 
                   className="form-control" 
                   placeholder="Release date"
                   value={ReleaseDate}
                   onChange={e => setReleaseDate(e.target.value)}
                />
          </div>
          <div className="col-sm-7 form-group">
                <p className="td1" htmlFor="MID">MID</p>
                <input 
                   id="ReleaseDate"
                   type="text" 
                   className="form-control" 
                   placeholder="MID"
                   value={MID}
                   onChange={e => setMID(e.target.value)}
                />
          </div>
          <div className="col-sm-7 form-group">
                <p className="td1" htmlFor="Duration">Duration</p>
                <input 
                   id="Duration"
                   type="number" 
                   className="form-control" 
                   placeholder="Movie Duration"
                   value={Duration}
                   onChange={e => setDuration(e.target.value)}
                />
          </div>
          <div className="col-12 form-group ">
                <button type="submit" className="btn btn-primary">Submit</button>
                
                <button type="reset" className="btn btn-danger" onClick={()=>history.push("/admin/table")}>cancel</button>
          </div>
       </div>
    </form>
       );
 }