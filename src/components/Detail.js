import React, { Component } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

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
        axios.get('../hot').then(
            res=>{
                console.log(res.data);
                this.setState({
                    Ten:res.data.Movie[0].Name,
                    Mota:res.data.Movie[0].Decription,
                    Anh:res.data.Movie[0].Poster
                })
            }
         )//.catch(
        //     err=>{
        //         console.log(err)
        //     }
        // )
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
        <div>
            <ReactPlayer url="https://www.youtube.com/watch?v=zTitoHKsyJg " controls={true}/>
             {this.state.Ten}
             <br />
             {this.state.Mota}
             <br />
             {this.state.Anh}
        </div>
       );
   }
}

