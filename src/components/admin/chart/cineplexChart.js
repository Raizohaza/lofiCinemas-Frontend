import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import DatePicker  from 'react-datepicker';
let API = axios.create({
  baseURL: `http://localhost:5000/`||`http://lofi-cinemas.herokuapp.com/`
});

const state = (labels,data) =>{
    console.log(labels,data);
    return{
    labels: [...labels],
    datasets: [
      {
        label: 'Revenue',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [...data]
      }
    ]
  }
}
function analyzeData(bookings,startDate,endDate){
    let numOr0 = n => isNaN(n) ? 0 : n
    let revenue = new Array(30).fill(0);
    let labels = [];
    let data = [];
    for (let i = 0; i < bookings.length; i++) {
      const booking = bookings[i];
      let dateTime = new Date(booking.DateTime);
      if(dateTime >= startDate && dateTime <= endDate)
        revenue[booking.CineplexId] += numOr0(booking.TotalPrice);
    }
    for (let i = 0; i < revenue.length; i++) {
      if(revenue[i] !== 0){
        labels.push(bookings[i].CineplexName);
        data.push(revenue[i]);
      }
    }
    return {labels,data};   
}
export function CineplexChart(){
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    const [listSale, setListSale] = useState([]);

    const [startDate, setStartDate] = useState(new Date('2021-7-10'));
    const [endDate, setEndDate] = useState(new Date('2021-7-20'));
    useEffect(() => {
        const getUserAPI = '/bookingRevenueCineplex';
        API.get(getUserAPI).then((res) => {
          setListSale(res.data);
        })
    }, []);
    useEffect(async() => { 
      let {labels, data} = await analyzeData(listSale,startDate,endDate);
      setLabels(labels);
      setData(data);

  }, [listSale,startDate,endDate]);

  let dateTimePicker = <div>
  <DatePicker  selected={startDate} onChange={(date) => {
      console.log(date.toLocaleDateString('vi'))  ;
      setStartDate(date)
    }} />
    <DatePicker   format='DD-MM-YYYY' selected={endDate} onChange={(date) => {
      console.log(date.toLocaleDateString('vi'))  ;
      setEndDate(date)
    }} />
  </div>
    return (
      <div>
        {dateTimePicker}
        <Bar
          data={state(labels,data)}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
        <hr/>
        <button onClick={(e)=>{
          e.preventDefault();
          let {labels, data} = analyzeData(listSale);
          setLabels(labels);
          setData(data);
        }}>

        </button>
      </div>
      
    );
}
