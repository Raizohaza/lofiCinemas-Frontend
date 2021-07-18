
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectShowtime,addShowtimeAsync, getShowtimeAsync, editShowtimeAsync} from './showtimeSlice';
import {ShowtimeForm} from '../../components/admin/showtime/ShowtimeForm';
export function AddShowtimeForm(){
   let curr = {
      TimeBegin:"",
      DateShow:"",
      Price:"",
      MovieId:"",
      CinemaId:""
   }
   return(ShowtimeForm(curr,addShowtimeAsync));
}

export function EditShowtimeForm(){
   const showtimes = useSelector(selectShowtime);
   const dispatch = useDispatch();
   let {id} = useParams();
   let curr = {
    TimeBegin:"",
    DateShow:"",
    Price:"",
    MovieId:"",
    CinemaId:""
   }
   if(showtimes.length === 0){
      dispatch(getShowtimeAsync());
   }
   if(id && showtimes.length !== 0){
      curr = showtimes.find(mov => mov.id === id);
   }
   return(ShowtimeForm(curr,editShowtimeAsync));
}