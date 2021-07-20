import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export function CineplexForm(curr,action) {
    const dispatch = useDispatch();
    let history = useHistory();
    const [Name, setName] = useState(curr.Name);
    const [Address, setAddress] = useState(curr.Address);
    return(
       <form onSubmit={(e) => {
         let data = {
            id: curr.id,
            Name: Name,
            Address: Address,
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
                   <label htmlFor="Address">Address</label>
                   <input 
                      id="Type"
                      type="text" 
                      className="form-control" 
                      placeholder="Address" 
                      value={Address}
                      onChange={e => setAddress(e.target.value)}
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