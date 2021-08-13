import React, { Component } from 'react';

export default function auth() {
    const user = localStorage.getItem('UID')
    if(!user) {
        window.location = '/login'
    }
    else if(user&&localStorage.Role ==='admin')
        window.location ='/admin/dashboard'
    return (
        <div></div>
    );
}