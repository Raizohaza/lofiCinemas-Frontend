import React, { useState,Component } from 'react';
import axios from 'axios';

export default class Homepage extends Component{
 
    constructor(props){
        super(props)
        this.state={
            posts:[]
        }
    }
    handleClick(id) {
        console.log('this is:', id);
        axios.post('../movie/'+id)
        .then(res=>{
            console.log(res.data)
        });
      }
    componentDidMount(){
        axios.get('../nowplaying')
        .then(res=>{
            console.log(res)
            this.setState({posts:res.data.Movie})
        });
    }
    render(){
        const {posts}=this.state
        return(
            <div>
                {
                    posts.map(post => 
                        <div key={post.id}> 
                            
                        <button type='submit' onClick={() => this.handleClick(post.id)}>
                            <img src={post.Poster}/>
                        </button>    
                        <p>{post.Name} </p>                              
                        </div>
                    ) 
                }
            </div>         
            
        );
    }
}