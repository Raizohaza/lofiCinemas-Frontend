import API from 'api';

import '../styles.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkout from '../checkout';
import { prepareForBooking } from 'features/booking/bookingSlice';

export default function BookingSeat(selectedShowtime){
    const [bookedSeat, setBookedSeat] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [payingState, setPayingState] = useState(false);
    const dispatch = useDispatch();
    let userState = useSelector(state => state.user.User);

    useEffect(() => { 
        async function fetchData(){
          if(selectedShowtime){
            const getShowTimeAPI = `/showtime/${selectedShowtime.id}/seat`;
            API.get(getShowTimeAPI).then((res) => {
              setBookedSeat(res.data);
              setSelectedSeat([]);
              setPayingState(false);
            });
          }
        }
        fetchData()
      }, [selectedShowtime]);
    const renderSeatCode = () => 
    {
      if(selectedShowtime)
      {
      const vertical_size= selectedShowtime.Height;
      const arr = new Array(vertical_size * selectedShowtime.Width).fill("");
      const newArr = arr.map((elem, index) => 
      {
        const charI = String.fromCharCode(65 + ~~(index / selectedShowtime.Width));
        const number = ~~(index % selectedShowtime.Width) + 1;
        return { seat: `${charI}${number}`, available: false };
      });
      return newArr;}
    };
    //fix disabled,selected seat here
    const renderSeat = () => {
      if(renderSeatCode()!==undefined){
      return renderSeatCode().map((elm, _index) => {
        if(bookedSeat.includes(elm.seat)){
          return (
            <div key={_index} style={{ width: `calc(100%/${selectedShowtime.Width} - 2rem)`, margin: "1rem" }}>
              <div  className="single-seat ">
                <span onClick={()=>{
                }} className="sit-num " style={{ background: "gray" }}>{elm.seat}</span>
              </div>
            </div>)
        }
        else if(selectedSeat.includes(elm.seat)){
          return (
            <div key={_index} style={{ width: `calc(100%/${selectedShowtime.Width} - 2rem)`, margin: "1rem" }}>
              <div  className="single-seat ">
                <span onClick={()=>{
                  let arr = [];
                  arr.push(...selectedSeat);
                  arr = arr.filter(item => item !== elm.seat);
                  setSelectedSeat(arr);
                }} className="sit-num " style={{ background: "yellow" }}>{elm.seat}</span>
              </div>
            </div>)
        }
        else
        return (
          <div key={_index} style={{ width: `calc(100%/${selectedShowtime.Width} - 2rem)`, margin: "1rem" }}>
            <div className="single-seat">
              <span onClick={()=>{
                let arr = [];
                arr.push(...selectedSeat,elm.seat);
                setSelectedSeat(arr);
              }} className="sit-num ">{elm.seat}</span>
            </div>
          </div>)
      });}
    };

    return(
        <>
            {payingState?<Checkout/>:
              <div className="screen-wrapper">
                <div className="seat-area couple">
                  <div className="seat-line">
                    {renderSeat()}
                  </div>
                </div>
              </div>
            }
            {selectedShowtime&&!payingState&&userState.id && <button className="btn-book" onClick={()=>{
              let prices = selectedSeat.map(item =>45000);
              let totalPrice = 45000*selectedSeat.length;
              console.log(totalPrice);
              let data = {
                DateTime: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                UserId: userState.id,
                ShowTimeId: selectedShowtime.id,
                Seats: selectedSeat,
                TotalPrice: totalPrice,
                Price : prices
              }
              dispatch(prepareForBooking(data));
              setPayingState(true);
            } 
        }>
        ?????t v??
        </button>}
      </>
    )
}