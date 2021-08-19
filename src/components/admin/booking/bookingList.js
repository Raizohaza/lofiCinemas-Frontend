import {Table,Button} from 'react-bootstrap'
import { useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectBooking , getBookingAsync} from '../../../features/booking/bookingSlice';

export function BookingList() {
    const dispatch = useDispatch();
    const bookingList = useSelector(selectBooking);
    if(bookingList.length === 0 || bookingList.length ===1){
      dispatch(getBookingAsync());
    }
    let dem = 1;
    let history = useHistory();

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