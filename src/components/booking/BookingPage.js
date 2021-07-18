import React,{useState} from 'react';
import './booking.css';
import SeatMatrix from "./SeatMatrix";

export default function BookingPage()
{
    const [movietest, EditMovietest] = useState({
		movieNames: {
			"Bloodshot": 10,
			"The girl on the Train": 8,
			"The invisible Man": 11,
			"Onward": 12,
			"My Spy": 9
		},
		moviePrice: 10,
		totalSeats: 0,
		seatNumbers: []
	})
        return (
            <div className='booking'>
                <button className='btn-close'>X</button>
                <div className="date">
                    <button className="btn-date">T2</button>
                    <button className="btn-date">T3</button>
                    <button className="btn-date">T4</button>
                </div>
                <div className="cinema">
                    <button className="btn-cinema">Cinema 1</button>
                    <button className="btn-cinema">Cinema 2</button>
                </div>
                <div className="time">
                    <button className="btn-time">7 A.M</button>
                    <button className="btn-time">9 A.M</button>
                    <button className="btn-time">10 A.M</button>
                </div>
                <div><SeatMatrix value={{ movietest, changeState: EditMovietest }}/></div>
            </div>
        );

}