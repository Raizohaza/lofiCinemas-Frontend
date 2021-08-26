import React, { useEffect } from 'react';
import {Table} from 'react-bootstrap'
import { useSelector, useDispatch} from 'react-redux';
import { selectBooking , getBookingByIdAsync} from '../../features/booking/bookingSlice';
import moment from "moment";
import Barcode from 'react-barcode';
export default function BookingList() {
  const dispatch = useDispatch();
  let bookingList = useSelector(selectBooking);
  let curUser =  useSelector(state=> state.user);
  console.log(curUser);
  useEffect(()=>{
    const fetchData = async ()=>{
      dispatch(getBookingByIdAsync({id:curUser.User.id}));
    }
    fetchData();
  },[dispatch,curUser.User.id]);

  let dem = 1;
  console.log(bookingList);
  let components = bookingList.map((data) =>
  {
    let dateTime = moment(data.booking.DateTime).format('h:mm:ss a DD-MM-YYYY');
    let dateTimeById = new Date(data.booking.DateTime);
    let currDateTime = new Date(data.showtimes.DateShow + ' ' + data.showtimes.TimeBegin)? new Date(data.showtimes.DateShow + ' ' + data.showtimes.TimeBegin) : new Date();
    let timeBegin = moment(currDateTime).format('h:mm:ss a');
    let timeEnd = moment(currDateTime).add(data.showtimes.Movie.Duration, 'm').format('h:mm:ss a');
    console.log(timeEnd);
    return(
      <tr key={data.booking.id}>
        <td>{dem++}</td>
        <td>{<Barcode value={data.booking.id+dateTimeById.getTime()}/>}</td>
        <td>{dateTime}</td>             
        <td>{data.booking.TotalPrice}</td>
        <td>{timeBegin + ' - ' + timeEnd}</td>
        <td>{data.showtimes.Cinema.Cineplex.Name}</td>
        <td>{data.showtimes.Cinema.Name}</td>
        <td>{data.tickets.join(',')}</td>
      </tr>
    );
  }
  );
  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Barcode</th>
            <th>Booking Time</th>
            <th>TotalPrice</th>
            <th>Showtime</th>
            <th>Cineplex</th>
            <th>Cinema</th>
            <th>Seat</th>
          </tr>
        </thead>
        <tbody>
          {components}
        </tbody>
    </Table>
    </div>
    
  );
}