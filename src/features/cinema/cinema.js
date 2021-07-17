import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCinema,addCinemaAsync, getCinemaAsync, editCinemaAsync} from './cinemaSlice';
import {CinemaForm} from '../../components/admin/cinema/CinemaForm';

export function AddCinemaForm(){
   let curr = {
      Name:"",
      Type:"",
      Width:"",
      Height:"",
   }
   return(CinemaForm(curr,addCinemaAsync));
}

export function EditCinemaForm(){
   const cinemas = useSelector(selectCinema);
   const dispatch = useDispatch();
   let {id} = useParams();
   let curr = {
      Name:"",
      Type:"",
      Width:"",
      Height:"",
   }
   if(cinemas.length === 0){
      dispatch(getCinemaAsync());
   }
   if(id && cinemas.length !== 0){
      curr = cinemas.find(mov => mov.id == id);
   }
   return(CinemaForm(curr,editCinemaAsync));
}