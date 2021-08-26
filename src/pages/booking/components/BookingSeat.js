import API from 'api';

import '../styles.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Checkout from '../checkout';

export default function BookingSeat(selectedShowtime){
    const [bookedSeat, setBookedSeat] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [payingState, setPayingState] = useState(false);
    
    let userState = useSelector(state => state.user.User)

    useEffect(() => { 
        async function fetchData(){
          if(selectedShowtime){
            const getShowTimeAPI = `/showtime/${selectedShowtime.id}/seat`;
            API.get(getShowTimeAPI).then((res) => {
              setBookedSeat(res.data);
              setSelectedSeat([]);
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
                TotalPrice: totalPrice
              }
              console.log('bookingData',data);
              localStorage.setItem('DateTime',data.DateTime)
              localStorage.setItem('ShowTimeId',data.ShowTimeId)
              localStorage.setItem('Seats',data.Seats)
              localStorage.setItem('Price',prices)
              localStorage.setItem('TotalPrice',totalPrice)
              setPayingState(true);
              // API.post('/booking/add',data).then(res =>{
              //     localStorage.setItem('DateTime',data.DateTime)
              //     localStorage.setItem('ShowTimeId',data.ShowTimeId)
              //     localStorage.setItem('Seats',data.Seats)
              //     localStorage.setItem('Price',sumPrice)
              // });
              //history.push('checkout');
            } 
        }>
        Đặt vé
        </button>}
      </>
    )
}