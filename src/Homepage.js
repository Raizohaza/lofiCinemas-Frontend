import React, { useState,Component } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import {Link} from "react-router-dom";

export default class Homepage extends Component{
 
    constructor(props){
        super(props)
        this.state={
            posts:[]
        }
    }
  
    handleSubmit = (props) =>{
       
        localStorage.setItem('token3',this.props.id);          
     }
    componentDidMount(){
        axios.get('../hot')
        .then(res=>{
            console.log(res)
            this.setState({posts:res.data.Movie})
        })
    }
   render(){
    const {posts}=this.state
   
       return(
           
            <div>
               
              <form onSubmit={this.handleSubmit}>
                   {posts.map(post => 
                   <div key={post.id}> 
                           <button type='submit'>
                       <img src={post.Poster}/>
                       {post.Name}   
                       </button>                                  
                    </div>) }
                    </form>               
               
           </div>         
          
       );
   }
}