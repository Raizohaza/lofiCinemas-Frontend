import { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

export function CineplexForm(curr,action) {
    const dispatch = useDispatch();
    let history = useHistory();
    const [Name, setName] = useState(curr.Name);
    const [Type, setType] = useState(curr.Type);
    const [Width, setWidth] = useState(curr.Width);
    const [Height, setHeight] = useState(curr.Height);
    return(
       <form onSubmit={(e) => {
         let data = {
            id: curr.id,
            Name: Name,
            Height: Height,
         }
         e.preventDefault();
         console.log(data);
         dispatch(action({...data}));
         history.push("/admin/cineplex");   
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
            </div>
          </div>
       </div>
       <div className="row">
       <div className="col-12 form-group ">
                <button type="submit" className="btn btn-primary">Submit</button>
                
                <button type="reset" className="btn btn-danger" onClick={()=>history.push("/admin/cineplex")}>cancel</button>
          </div>
       </div>
    </form>
       );
 }