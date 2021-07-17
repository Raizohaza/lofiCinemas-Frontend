import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams,useHistory } from 'react-router-dom';
import { selectMovie,addMovieAsync, getMovieAsync, editMovieAsync,deleteMovieAsync} from './movieSlice';
import {MovieForm} from '../../components/admin/movie/MovieForm';

export function AddMovieForm(){
   let curr = {
      Name:"",
      Poster:"",
      Trailer:"",
      Description:"",
      ReleaseDate:"",
      Duration:"",
      MID:""
   }
   return(MovieForm(curr,addMovieAsync));
}
export function EditMovieForm(){
   const movies = useSelector(selectMovie);
   const dispatch = useDispatch();
   let {id} = useParams();
   let curr = {
      Name:"",
      Poster:"",
      Trailer:"",
      Description:"",
      ReleaseDate:"",
      Duration:"",
      MID:""
   }
   if(movies.length === 0){
      dispatch(getMovieAsync());
   }
   if(id && movies.length !== 0){
      curr = movies.find(mov => mov.id == id);
   }
   return(MovieForm(curr,editMovieAsync));
}