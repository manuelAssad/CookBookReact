import React, { Component } from "react";

import "./styles.scss";

class Footer extends Component {
  render() {
    return (
      <div>
        <footer>
          <div className="container mt-5">
            <div className="page-divider mb-5"></div>
            <div className="row">
              <div className="col-lg-3 d-flex justify-content-start mb-4 mb-lg-0">
                <a href="index.html" className="hvr-grow footer-logo">
                  <h4 className="footer-logo">
                    COOK<span className="footer-logo-light">BOOK</span>
                  </h4>
                </a>
              </div>
              <div className="col">
                <div className="row">
                  <div className="col-6 col-sm-4">
                    <h5>Home</h5>
                    <ul className="list-unstyled">
                      <li>
                        <a className="footer-link" href="#">
                          Home
                        </a>
                      </li>
                      <li>
                        <a className="footer-link" href="#">
                          My List
                        </a>
                      </li>
                      <li>
                        <a className="footer-link" href="#">
                          Recipes
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-6 col-sm-4">
                    <h5>Social</h5>
                    <ul className="list-unstyled">
                      <li>
                        <a className="footer-link" href="#">
                          Facebook
                        </a>
                      </li>
                      <li>
                        <a className="footer-link" href="#">
                          Instagram
                        </a>
                      </li>
                      <li>
                        <a className="footer-link" href="#">
                          Twitter
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-6 col-sm-4 mt-3 mt-sm-0">
                    <h5>User</h5>
                    <ul className="list-unstyled">
                      <li>
                        <a className="footer-link" href="#">
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 d-flex justify-content-lg-end mt-4 mt-lg-0">
                <div>
                  <a className="link" href="http://fb.com/">
                    <i className="fa fa-facebook-square contact-social-icon hvr-grow"></i>
                  </a>
                  <a className="link" href="http://instagram.com/">
                    <i className="fa fa-instagram contact-social-icon hvr-grow"></i>
                  </a>
                  <a className="link" href="http://twitter.com/">
                    <i className="fa fa-twitter contact-social-icon hvr-grow"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="page-divider mb-3 mt-3"></div>
            <p>Copyright @2021</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
