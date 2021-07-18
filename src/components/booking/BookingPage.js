import React, {useState} from "react"
import MovieContext from './contexts/MovieContext'
import "./appseat.css"
import MovieSelector from "./MovieSelector"
import SeatAvailability from "./SeatAvailability"
import SeatMatrix from "./SeatMatrix"
import PriceCalculator from "./PriceCalculator"

export default function BookingPage(){

	const [movies, EditMovies] = useState({
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
		<div className="main container">
			<MovieContext.Provider value={{ movies, changeState: EditMovies }}>
				<MovieSelector />
				<SeatMatrix />
				<SeatAvailability />
				<PriceCalculator />
			</MovieContext.Provider>
		</div>
	)
}