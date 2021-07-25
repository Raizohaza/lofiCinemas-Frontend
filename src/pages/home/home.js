import React from "react";
import Content from '../content/Content'
import Checkout from '../booking/checkout'
import './home.css'
import Comming from "pages/content/Comming";
import Hot from "pages/content/Hot";
export default function Home(props){
    return(
        <div >
            <Content/>
            <Comming/>
            <Hot/>
        </div>
    );
}