import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link,useHistory } from 'react-router-dom';
import { selectCinema} from '../../../features/cinema/cinemaSlice';
import { selectCineplex} from '../../../features/cineplex/cineplexSlice';
import { selectShowtime} from '../../../features/showtime/showtimeSlice';
import { Bar } from 'react-chartjs-2';


export function CineplexChart(){
    let cinemaList = useSelector(selectCinema);
    const [cinemaState, setCinemaState] = useState(cinemaList);
    const cineplexList = useSelector(selectCineplex);
    const showtimeList = useSelector(selectShowtime);
    let cineplexName = [];
    let cineplexId = [];
    let cineplexIdFaker =[];
    let cinemaId = [];
    let components = cineplexList.map((cineplex) =>
    {
      return(
          cineplexName.push(cineplex.Name),
          cineplexId.push(cineplex.id)        
      )});
    // let data = cineplexList.map((cineplex)=>{
    //     return(
    //         cinemaList = cinemaList.push((cinema)=>cinema.CineplexId === cineplex.id),
    //         setCinemaState(cinemaList),
    //         cineplexName.push(cineplexList.Name),
    //         console.log(cinemaList)
    //     )
    //   });
    let componentsCinema = cinemaList.map((cinema)=>{
        return(
            cineplexIdFaker.push(cinema.CineplexId),
            cineplexId?cineplexIdFaker:cinemaId.push(cinema.id)
        )
    })
    console.log(cineplexIdFaker);
    console.log(cinemaId);
    let state = {
        labels: cineplexId, //cineplex 
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: [50,60,80,90,50,60] //list booking + vao neu bang cinema id
          }
        ]
    }
    return (
      <div>
        <Bar
          data={state}
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
      </div>
      
    );
}
