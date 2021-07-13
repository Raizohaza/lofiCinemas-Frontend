import React from "react";

import Banner from '../banner/Banner';
import Content from '../content/Content'

import './home.css'

export default function Home(props){
    return(
        <div className='Home'>
            <Banner/>
            <Content/>
        </div>
    );
}