import { useEffect } from 'react';
import {Table} from 'react-bootstrap'
import { useSelector, useDispatch} from 'react-redux';
import { selectBooking , getBookingByIdAsync} from '../../features/booking/bookingSlice';

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

  let components = bookingList.map((booking) =>
  {
    return(
      <tr key={booking.id}>
        <td>{dem++}</td>
        <td>{booking.DateTime}</td>             
        <td>{booking.TotalPrice}</td>
        <td>{booking.UserId}</td>
        <td>{booking.ShowTimeId}</td>
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
            <th>DateTime</th>
            <th>TotalPrice</th>
            <th>UserId</th>
            <th>ShowTimeId</th>
          </tr>
        </thead>
        <tbody>
          {components}
        </tbody>
    </Table>
    </div>
    
  );
}