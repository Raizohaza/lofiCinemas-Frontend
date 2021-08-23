import React, { Component } from 'react';
import './style.css';

class Footer extends Component {
 
    render() {
      return (
        <div>
          <title>Footer Design</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="css/style.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
          <footer className="footer">
            <div className="container">
              <div className="row">
                <div className="footer-col">
                  <h4>company</h4>
                  <ul>
                    <li><a href="/">about us</a></li>
                    <li><a href="/">our services</a></li>
                    <li><a href="/">privacy policy</a></li>
                    <li><a href="/">affiliate program</a></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4>get help</h4>
                  <ul>
                    <li><a href="/">FAQ</a></li>
                    <li><a href="/">shipping</a></li>
                    <li><a href="/">returns</a></li>
                    <li><a href="/">order status</a></li>
                    <li><a href="/">payment options</a></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4>follow us</h4>
                  <div className="social-links">
                    <a href="/"><i className="fab fa-facebook-f" /></a>
                    <a href="/"><i className="fab fa-twitter" /></a>
                    <a href="/"><i className="fab fa-instagram" /></a>
                    <a href="/"><i className="fab fa-linkedin-in" /></a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      );
    }
 
 }
export default Footer;
