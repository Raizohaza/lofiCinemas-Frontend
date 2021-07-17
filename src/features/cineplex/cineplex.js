import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCineplex,addCineplexAsync, getCineplexAsync, editCineplexAsync} from './cineplexSlice';
import {CineplexForm} from '../../components/admin/cineplex/CineplexForm';

export function AddCineplexForm(){
   let curr = {
      Name:"",
      Address:"",
   }
   return(CineplexForm(curr,addCineplexAsync));
}

export function EditCineplexForm(){
   const cineplexes = useSelector(selectCineplex);
   const dispatch = useDispatch();
   let {id} = useParams();
   let curr = {
      Name:"",
      Address:"",
   }
   if(cineplexes.length === 0){
      dispatch(getCineplexAsync());
   }
   if(id && cineplexes.length !== 0){
      curr = cineplexes.find(mov => mov.id == id);
   }
   return(CineplexForm(curr,editCineplexAsync));
}