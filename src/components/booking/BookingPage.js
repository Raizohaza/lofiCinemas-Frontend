import React, { Component } from 'react';
import axios from 'axios';

import './booking.css'


export default class BookingPage extends Component{

    constructor(props)
    {
        super(props)
    }
   
    render()
    {
        const icon = '<-';
        return (
            <div className='booking'>
                <button className='btn-close'>{icon}</button>
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
            </div>
        );
    }

}