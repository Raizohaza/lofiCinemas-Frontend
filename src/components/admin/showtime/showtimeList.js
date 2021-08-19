import {Table,Button} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { Link,useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import { selectShowtime , getShowtimeAsync,deleteShowtimeAsync} from '../../../features/showtime/showtimeSlice';
import DatePicker from "react-datepicker"; //import reat-datepicker module
import "react-datepicker/dist/react-datepicker.css"; //import reat-datepicker module css
import { FiCalendar } from "react-icons/fi";
export function ShowtimeList() {
    const dispatch = useDispatch();
    const showtimeList = useSelector(selectShowtime);
    const DatePickerCustomInput = React.forwardRef(
      ({ onClick }, ref) => (<div className="calendar_icon"><FiCalendar onClick={onClick} /></div>));
    useEffect(()=>{
      const fetchData = async ()=>{
        dispatch(getShowtimeAsync());
      }
      fetchData();
    },[]);
    
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
              setTimeout(() => {
                dispatch(getShowtimeAsync());
                history.push('/admin/showtime');
              }, 100);
            }}>Delete</Button>
          </td>
        </tr>
      );
    }
    );
    return (
      <div>
        <Button onClick={handleClick}>
        Add
        </Button>
        <DatePicker
        customInput={<DatePickerCustomInput ref={ref} />}
        />
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