import {Table,Dropdown,ButtonGroup,Button} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { Link,useHistory } from 'react-router-dom';
import React from 'react';
import { selectShowtime ,addShowtimeAsync, getShowtimeAsync,deleteShowtimeAsync} from '../../../features/showtime/showtimeSlice';
import DatePicker from "react-datepicker"; //import reat-datepicker module
import "react-datepicker/dist/react-datepicker.css"; //import reat-datepicker module css
import { FiCalendar } from "react-icons/fi";
export function ShowtimeList() {
    const dispatch = useDispatch();
    const showtimeList = useSelector(selectShowtime);
    console.log(showtimeList);
    const DatePickerCustomInput = React.forwardRef(
      ({ onClick }, ref) => (<div className="calendar_icon"><FiCalendar onClick={onClick} /></div>));
    if(showtimeList.length === 0 || showtimeList.length ===1){
      dispatch(getShowtimeAsync());
      
    }
    let dem = 1;
    const ref = React.createRef();
    let history = useHistory();

    function handleClick() {
      history.push("/admin/showtime/add");
    }
    let components = showtimeList.map((showtime) =>
    {
      return(
        <tr key={showtime.id}>
          <td>{dem++}</td>
          <td>{showtime.TimeBegin}</td>             
          <td>{showtime.DateShow}</td>
          <td>{showtime.Price}</td>
          <td>{showtime.CinemaId}</td>
          <td>{showtime.MovieId}</td>
          <td>
            <Button>
            <Link to={`/admin/showtime/${showtime.id}/edit`}>Edit</Link>
            </Button>
          </td>
          <td>
            <Button onClick={(e)=>{
              e.preventDefault();
              dispatch(deleteShowtimeAsync({id:showtime.id}));
              history.push('/admin/showtime');
            }}>Delete</Button>
          </td>
        </tr>
      );
    }
    );
    return (
      <div>
        <DatePicker
        customInput={<DatePickerCustomInput ref={ref} />}
        />
        <Button onClick={handleClick}>
        Add
        </Button>   
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>TimeBegin</th>
              <th>DateShow</th>
              <th>Price</th>
              <th>CinemaId</th>
              <th>MovieId</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {components}
          </tbody>
      </Table>
      </div>
    );
  }