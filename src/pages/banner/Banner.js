import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


import item1 from '../../assets/img/item1.jpg'
import item2 from '../../assets/img/item2.jpg'
import item3 from '../../assets/img/item3.jpg'
import item4 from '../../assets/img/item4.jpg'

import './banner.css'


class banner extends Component {
    render() {
        return (
                <Carousel axis='horizontal'>
                    <div className="item">
                        <img className="size-img" src={item4} />
                    </div>
                    <div className="item">
                        <img className="size-img" src={item2} />
                        
                    </div>
                    <div className="item">
                        <img className="size-img" src={item3} />
                    </div>
                    <div className="item">
                        <img className="size-img" src={item1} />
                    </div>
                </Carousel>
        );
    }
};

export default banner;