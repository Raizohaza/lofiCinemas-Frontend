import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import './style.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default class Content extends Component{

    constructor(props)
    {
        super(props)
        this.state={
            posts:[]
        }
    }
    
    componentDidMount(){
        axios.get('https://lofi-cinemas.herokuapp.com/nowplaying')
        .then(res=>{
            this.setState({posts:res.data.Movie})
        });
    }


    handleClick(id){
        localStorage.setItem('id', id)
    }

    render()
    {
        return(
            <div className="content">
                {
                    this.state.posts.map(post => 
                        
                            <div className="items">
                                <button className='btn' type='submit' onClick={() => this.handleClick(post)}>
                                    <img className='poster' src={post.Poster}/>
                                </button>    
                                <p className="name">{post.Name} </p>
                            </div>
                                                                    
                    ) 
                }
                
            </div>
        );
        
    }

}