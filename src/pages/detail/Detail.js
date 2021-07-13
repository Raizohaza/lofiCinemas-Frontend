import React, { Component } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
    faThumbsUp,
    faThumbsDown,
    faShoppingCart
} from '@fortawesome/free-solid-svg-icons'


import './detail.css'

export default class Detail extends Component{
    constructor(props)
    {
        super(props)
        this.state={
           item:[]
        };
    }
    componentDidMount = e =>{
         
        const id = localStorage.getItem('id')
         
        
    };


   render(){
       return(
        <div className='detail'>
            <div className="item-info">
                <img className="poster-avatar" src={this.state.post.Poster}/>
                <div className="infomation">  
                    <p className="item-name">{this.state.post.Name}</p>
                    <div className="affaction">
                        <button className='btn'>
                            <i className='iconn'><FontAwesomeIcon icon={faThumbsUp}/></i>
                        </button>
                        <button className='btn'>
                            <i className='iconn'><FontAwesomeIcon icon={faThumbsDown}/></i>
                        </button>
                    </div>
                    <button className='btn cart'>
                            <i className='iconn'><FontAwesomeIcon icon={faShoppingCart}/></i>
                            <p>Mua vé</p>
                    </button>
                    
                </div>
            </div>
            <div className="decription">             
                {this.state.post.Decription}
            </div>
            <ReactPlayer className='trailer' width='1' height='1' url={this.state.post.Trailer} controls={true}/>
        </div>
       );
   }
}

