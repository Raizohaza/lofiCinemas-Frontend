import React from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getMovieDetails } from "../../redux/action/movieAction";
import { postBookingShow } from "../../redux/action/movieAction";

import './detail.css'

export default function Detail({match})
{
    const [openformLogin, setOpenformLogin] = React.useState(false);
    const dispatch = useDispatch();
    const movieDetails = useSelector((state) => state.getMovieDetails);
    const { loading, error, movies } = movieDetails;
    useEffect(() => {
        if (match) {
          dispatch(getMovieDetails(match.params.id));
        }
        if (movies) {
          dispatch(postBookingShow(movies.id));
        }
      }, [dispatch, match, openformLogin]);

    return(
        <div className="aw">
            {loading ? (
              <h2>Loading...</h2>
            ) : error ? (
              <h2>{error}</h2>
            ) : (
            <div className='detail'>
                <div className="item-info">
                    <img className="poster-avatar" alt="" src={movies.Poster}/>
                    <div className="infomation">  
                        <p className="item-name">{movies.Name}</p>
                        <p className="item-i">Trạng thái: {movies.Status}</p>
                        <p className="item-i">Thời lượng: {movies.Duration}p</p>
                        <Link to={`booking/${movies.id}`}>
                          <button className="cart">Đặt vé</button>
                        </Link>
                    </div>
                </div>
                <div className="decription">             
                    {movies.Description}
                </div>
                <ReactPlayer className='trailer' width='1' height='1' url={movies.Trailer} controls={true}/>
            </div>
            )}
        </div>
    );
  
}

