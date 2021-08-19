import API from 'api';

import '../styles.css'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function BookingSeat(selectedShowtime){
    const [bookedSeat, setBookedSeat] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState([]);
    let history = useHistory();
    let curUser =  useSelector(state=> state.user);
    // console.log(selectedSeat);

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
                  // console.log(elm.seat);
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
                }} className="sit-num " style={{ background: "blue" }}>{elm.seat}</span>
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
            <div className="screen-wrapper">
              <div className="seat-area couple">
                <div className="seat-line">
                  {renderSeat()}
                </div>
              </div>
            </div>

            {selectedShowtime&&localStorage.UID && <button className="btn-book" onClick={()=>{
            let prices = selectedSeat.map(item =>45000);
            let sumPrice = 0;
            // console.log(sumPrice);
            let data = {
            DateTime: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            UserId: localStorage.UID,
            ShowTimeId: selectedShowtime.id,
            Seats: selectedSeat,
            Price: prices
            }
            // console.log(data);
            API.post('/booking/add',data).then(res =>{
                localStorage.setItem('DateTime',data.DateTime)
                localStorage.setItem('ShowTimeId',data.ShowTimeId)
                localStorage.setItem('Seats',data.Seats)
                localStorage.setItem('Price',sumPrice)
                console.log(res.data)
            });
            history.push('checkout');
            } 
        }>
        Đặt vé
        </button>}
      </>
    )
}