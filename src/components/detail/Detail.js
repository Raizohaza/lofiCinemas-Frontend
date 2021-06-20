import React, { Component } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
    faThumbsUp,
    faThumbsDown
} from '@fortawesome/free-solid-svg-icons'

export default class Detail extends Component{
    state = {}
    componentDidMount = e =>{
        const Movie ={
            Name:this.name,
            ReleaseDate:this.releasedate,
            Poster:this.poster,
            Duration:this.duration,
            Decription:this.decription,
            Genres:this.genres,
            MID:this.mid,
            Status:this.status,
            Trailer:this.trailer,
        };
        axios.get('url').then(
            res=>{
                console.log(res.data);
                this.setState({
                    Ten:res.data.Movie[0].Name,
                    Mota:res.data.Movie[0].Decription,
                    Anh:res.data.Movie[0].Poster
                })
            }
         )
    };
   render(){
        if( this.state.Moviee){
            return(
                <div>
                    {this.state.Ten}
                    
                    {this.state.Mota}
                   
                    {this.state.Anh}
                </div>
            )
        };
       return(
        <div className='detail'>
            <ReactPlayer className='trailer' url="https://www.youtube.com/watch?v=zTitoHKsyJg " controls={true}/>
            <div className="item-info">
                <div className="infomation">
                    <img className="poster-avatar" src={this.state.Poster}/>
                    <p className="item-name">{this.state.Name}</p>

                    <div className="affaction">
                        <i><FontAwesomeIcon icon={faThumbsUp}/></i>
                        <i><FontAwesomeIcon icon={faThumbsDown}/></i>
                    </div>
                </div>
                <div className="decription">
                        {this.state.Decription}
                </div>
                
            </div>
        </div>
       );
   }
}

