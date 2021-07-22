import React from "react";
import Content from '../content/Content';
import Content2 from '../content2/Content2';
import './home.css';

export default function Home(props){
    return(
        <div >
            <Content/>
            <Content/>
            <Content2/>
        </div>
    );
}