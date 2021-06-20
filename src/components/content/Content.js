import React, { Component } from 'react';

import './style.css'

export default class Content extends Component{

    constructor(props)
    {
        super(props)
        this.state={
            posts:[]
        }
    }
    handleClick(id){
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

    render()
    {
        return(
            <div className="content">
                {
                    posts.map(post => 
                        <div className="tittle" key={post.id}>
                            <div className="items">
                                <button type='submit' onClick={() => this.handleClick(post.id)}>
                                    <img src={post.Poster}/>
                                </button>    
                                <p className="name">{post.Name} </p>
                            </div>                              
                        </div>
                    ) 
                }
            </div>
        );
    }

}