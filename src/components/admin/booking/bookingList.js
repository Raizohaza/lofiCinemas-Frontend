import {Table,Dropdown,ButtonGroup,Button} from 'react-bootstrap'
import { useSelector, useDispatch} from 'react-redux';
import { Link,useHistory } from 'react-router-dom';
import { selectBooking , getBookingAsync,deleteBookingAsync} from '../../../features/booking/bookingSlice';

export function BookingList() {
    const dispatch = useDispatch();
    const bookingList = useSelector(selectBooking);
    //console.log(bookingList);
    if(bookingList.length === 0 || bookingList.length ===1){
      dispatch(getBookingAsync());
      
    }
    let dem = 1;
  let history = useHistory();

  function handleClick() {
    history.push("/admin/booking/add");
  }
    let components = bookingList.map((booking) =>
    {
      return(
        <tr key={booking.id}>
          <td>{dem++}</td>
          <td>{booking.Name}</td>             
          <td>{booking.Address}</td>
          <td>
            <Button>
              <Link to={`/admin/booking/${booking.id}/edit`}>Edit</Link>
            </Button>
          </td>
          <td>
            <Button onClick={(e)=>{
              e.preventDefault();
              dispatch(deleteBookingAsync({id:booking.id}));
              history.push('/admin/booking');
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
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Action</th>
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