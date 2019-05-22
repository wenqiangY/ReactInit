import React, {Component} from 'react';

import './page1.css'

import image from './images/brickpsert.jpg';

export default class Page1 extends Component {
    render() {
        return (
            <div className="red">
                Page1 页面<br/>
                <img src={image}/>
            </div>
        )
    }
}