import { Button } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./Swiper.scss";
SwiperComponent.propTypes = {};

function SwiperComponent({ movie }) {
  let loggedIn =  useSelector(state=>state.user.loggedIn);
  const history = useHistory();
  return (
    <div className="swipercomponent">
      {movie && (
        <div className="movie-grid">
          <div >
            <div className="movie-thumb c-thumb">
              <Link className="img-center" to={`detail/${movie.id}`}>
                <img className="img-center" src={movie.Poster} alt="movie" />
              </Link>
            </div>
            <div className="movie-content bg-one">
              <h5 className="title">
                <Link className="text-align" to={`detail/${movie.id}`}>{movie.Name}</Link>
              </h5>
            </div>
          </div>
          <div className="detail-background">
              <span className="subTitle">
              {movie.Status}
                <span className="subTitle"> Time:{movie.Duration} min</span>
              </span>
              <div className="controls">
                <Link className="text-btn" to={`detail/booking/${movie.id}`}>
                  <Button className="hover-btn" onClick={(e)=>{
                            if(!loggedIn){
                              e.preventDefault();
                              history.push('/login');
                            }
                  }}>
                      Book Ticket
                  </Button>
                </Link>
              </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default SwiperComponent;