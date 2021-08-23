import React from "react";
import Content from '../content/Content'
import './home.css'
import Coming from "pages/content/Coming";
import Hot from "pages/content/Hot";
export default function Home(props){
    return(
        <div>
            <Content/>
            <Hot/>
            <Coming/>
        </div>
    );
}