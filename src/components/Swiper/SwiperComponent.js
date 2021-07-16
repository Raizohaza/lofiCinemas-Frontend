import React from "react";
import { Link } from "react-router-dom";
import "./Swiper.scss";
SwiperComponent.propTypes = {};

function SwiperComponent({ movie }) {
  return (
    <div className="swipercomponent">
      {movie && (
        <div class="movie-grid">
          <div class="movie-thumb c-thumb">
            <Link to={`detail/${movie.id}`}>
              <img src={movie.Poster} alt="movie" />
            </Link>
          </div>
          <div class="movie-content bg-one">
            <h5 class="title">
              <Link className="text-align" to={`detail/${movie.id}`}>{movie.Name}</Link>
            </h5>
          </div>
        </div>
      )}
    </div>
  );
}

export default SwiperComponent;