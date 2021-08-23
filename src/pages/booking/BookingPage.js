import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {FilterShowtime} from './components/filterShowtime';
// import FilterShowtimeByCinema from './components/filterShowtimeByCinema';
import BookingSeat from './components/BookingSeat';
export default function BookingPage()
{
  let {id} = useParams();
  const [selectedShowtime, setSelectedShowtime] = useState();

  return(
    <div className="booking container">
      {FilterShowtime(id,setSelectedShowtime)}
      
      {BookingSeat(selectedShowtime)}
      
    </div>
  );
}