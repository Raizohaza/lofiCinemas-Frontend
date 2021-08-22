import { Button, CardContent, Typography,Card } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./Swiper.scss";
SwiperComponent.propTypes = {};

function SwiperComponent({ movie }) {
  return (
    <div className="swipercomponent">
      {movie && (
        <div className="movie-grid">
        <div >
          <div className="movie-thumb c-thumb">
            <Link to={`detail/${movie.id}`}>
              <img src={movie.Poster} alt="movie" />
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
              <Button className="hover-btn">
                  <Link to={`detail/booking/${movie.id}`}>
                    Book Ticket
                    </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default SwiperComponent;