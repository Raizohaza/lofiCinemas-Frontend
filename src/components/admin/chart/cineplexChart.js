import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import DatePicker  from 'react-datepicker';
import API from 'api';

const state = (labels,data) =>{
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
    let revenue = new Array(bookings.length).fill(0);
    let labelName = new Array(bookings.length).fill("");
    let labels = [];
    let data = [];
    for (let i = 0; i < bookings.length; i++) {
      const booking = bookings[i];
      let dateTime = new Date(booking.DateTime).getTime();
      console.log(booking.CineplexId);
      if(dateTime >= startDate && dateTime <= endDate){
        revenue[booking.CineplexId] += numOr0(booking.TotalPrice);
        labelName[booking.CineplexId] = booking.CineplexName;
      }
    }
    for (let i = 0; i < bookings.length; i++) {
      if(revenue[i] !== 0){
        console.log(bookings[i].CineplexName,i);
        labels.push(labelName[i]);
        data.push(revenue[i]);
      }
    }
    console.log(revenue);

    return {labels,data};   
}
export function CineplexChart(){
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    const [listSale, setListSale] = useState([]);

    const [startDate, setStartDate] = useState(new Date().setDate(new Date().getDate() - 7));
    const [endDate, setEndDate] = useState(new Date().setDate(new Date().getDate() + 7));
    useEffect(() => {
      async function fetchData() {
        const getUserAPI = '/bookingRevenueCineplex';
        API.get(getUserAPI).then((res) => {
          setListSale(res.data);
        })
      }
      fetchData();
    }, []);
    useEffect(() => { 
      async function fetchData() {
      let {labels, data} = await analyzeData(listSale,startDate,endDate);
      setLabels(labels);
      setData(data);
      }
      fetchData();

  }, [listSale,startDate,endDate]);

  let dateTimePicker = <div>
  <DatePicker  selected={startDate} onChange={(date) => {
      setStartDate(date)
  }} />
    <DatePicker   format='DD-MM-YYYY' selected={endDate} onChange={(date) => {
      setEndDate(date)
    }} />
  </div>
  if (labels.length===0) {
    return <div >
      {dateTimePicker}
      Loading...
    </div>;
  }
  else{
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
          let {labels, data} = analyzeData(listSale,startDate,endDate);
          setLabels(labels);
          setData(data);
        }}>

        </button>
      </div>
      
    );
  }
}
