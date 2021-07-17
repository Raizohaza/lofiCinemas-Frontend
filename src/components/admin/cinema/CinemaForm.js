import { useState } from "react";
import {Dropdown,ButtonGroup} from 'react-bootstrap';
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectCineplex } from '../../../features/cineplex/cineplexSlice';
export function CinemaForm(curr,action) {
    const dispatch = useDispatch();
    let history = useHistory();
    const [Name, setName] = useState(curr.Name);
    const [Type, setType] = useState(curr.Type);
    const [Width, setWidth] = useState(curr.Width);
    const [Height, setHeight] = useState(curr.Height);
    const [CineplexId, setCineplexId] = useState(curr.CinenplexId);
    const [CineplexName, setCineplexName] = useState("");
    const cineplexList = useSelector(selectCineplex);
    let dropdownItem = cineplexList.map((cineplex)=>{
      return(
        <Dropdown.Item onClick = {(e)=>{
          e.preventDefault();
          setCineplexId(cineplex.id);
          setCineplexName(cineplex.Name);
        }}>
            {cineplex.Name}
        </Dropdown.Item>
      )
    });
    return(
       <form onSubmit={(e) => {
         let data = {
            id: curr.id,
            Name: Name,
            Type: Type,
            Width: Width,
            Height: Height,
            CineplexId: CineplexId,
         }
         e.preventDefault();
         console.log(data);
         dispatch(action({...data}));
         history.push("/admin/cinema");   
       }
       }>
       <div className="row">
          <div className="col-lg-7">
             <div className="row">
                <div className="col-12 form-group">
                   <label htmlFor="Name">Name</label>
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
                   <label htmlFor="Type">Type</label>
                   <input 
                      id="Type"
                      type="text" 
                      className="form-control" 
                      placeholder="Type" 
                      value={Type}
                      onChange={e => setType(e.target.value)}
                   />
                </div>
                <div className="col-12 form_gallery form-group">
                   <label htmlFor="Width">Width</label>
                   <input 
                      id="Width"
                      type="text" 
                      className="form-control" 
                      placeholder="Width" 
                      value={Width}
                      onChange={e => setWidth(e.target.value)}
                   />
                </div>
                <div className="col-12 form_gallery form-group">
                   <label htmlFor="Height">Height</label>
                   <input 
                      id="Height"
                      type="text" 
                      className="form-control" 
                      placeholder="Height" 
                      value={Height}
                      onChange={e => setHeight(e.target.value)}
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
                        {dropdownItem}
                     </Dropdown.Menu>
                  </Dropdown>
                </div>

            </div>
          </div>
       </div>
       <div className="row">
       <div className="col-12 form-group ">
                <button type="submit" className="btn btn-primary">Submit</button>
                
                <button type="reset" className="btn btn-danger" onClick={()=>history.push("/admin/cinema")}>cancel</button>
          </div>
       </div>
    </form>
       );
 }