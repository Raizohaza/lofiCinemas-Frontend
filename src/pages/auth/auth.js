import React, { Component } from 'react';

export default class auth extends Component {

    constructor(props) {
        super(props)
        const user = localStorage.getItem('user')
        if(!user) {
            window.location = '/login'
        }
        else if(user&&localStorage.token3 ==='admin')
            window.location ='/admin/dashboard'
    }
    render() {
        return (
            <div></div>
        );
    }
}