import React from 'react';
import ReactPlayer from 'react-player';
import { Link, useHistory, useParams } from 'react-router-dom';

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getMovieByIdAsync } from 'features/movie/movieSlice';

import './detail.css'

export default function Detail()
{
    const dispatch = useDispatch();
    let {id} = useParams();
    const movies = useSelector((state) => state.movie.selectedMovie);
    const isLoading = useSelector((state) => state.movie.isLoading);
    let loggedIn =  useSelector(state=>state.user.loggedIn);
    const history = useHistory();
    useEffect(() => {
        if (id) {
          dispatch(getMovieByIdAsync(id));
        }
      }, [dispatch, id]);
    return(
        <div className="aw">
            {isLoading ? (
              <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            ) : (
            <div className='detail'>
                <div className="item-info">
                    <img className="poster-avatar" alt="" src={movies.Poster}/>
                    <div className="infomation">  
                        <p className="item-name">{movies.Name}</p>
                        <p className="item-i">Trạng thái: {movies.Status}</p>
                        <p className="item-i">Thời lượng: {movies.Duration}p</p>
                             <div className="decription">             
                                {movies.Description}
                            </div>
                        <Link to={`booking/${movies.id}`}>
                          <button className="cart" onClick={(e)=>{
                            if(!loggedIn){
                              e.preventDefault();
                              history.push('/login');
                            }
                          }}>BOOK TICKET</button>
                        </Link>
                    </div>
                </div>
                
                <ReactPlayer className='trailer' width='1' height='1' url={movies.Trailer} controls={true}/>
            </div>
            )}
        </div>
    );
  
}

