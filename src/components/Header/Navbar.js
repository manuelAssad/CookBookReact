import React, { Component } from 'react';
import "./styles.scss"

import ReactScrollDetect, { DetectSection } from 'react-scroll-detect';

import {Nav} from 'reactstrap'

class Navbar extends Component {

  render() {
      return (
          <>
        <div>
            <Nav className="navbar navbar-dark navbar-expand-lg fixed-top" fixed="top">
                <a className="navbar-brand hvr-grow" href="#homeSection">COOK<span className="navbar-brand-light">BOOK</span></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#cookbookNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button> 
                <div className="collapse navbar-collapse" id="cookbookNavbar">      
                    <ul className="navbar-nav mx-auto">
                  
                        <li onClick={()=>this.props.handleSectionChange(0)} className={`nav-item px-3 px-lg-0 pr-lg-3 mb-3 mb-lg-0 ${this.props.currentSection===0?"active":""}`}> <a className="nav-link" href="#homeCarousel">Home</a></li>
                 
                        <li className="nav-item px-3 mb-sm-3 mb-3 mb-lg-0"><a className="nav-link" href="grocery.html">My List</a></li>
                        <li className="nav-item px-3 mb-sm-3 mb-3 mb-lg-0"><a className="nav-link" href="recipe.html"> Recipes</a></li>
                        <li onClick={()=>this.props.handleSectionChange(1)} className={`nav-item px-3 mb-sm-3 mb-3 mb-lg-0 ${this.props.currentSection===1?"active":""}`}><a className="nav-link" href="#about"> About</a></li>
                        <li onClick={()=>this.props.handleSectionChange(2)} className={`nav-item px-3 mb-sm-3 mb-3 mb-lg-0 ${this.props.currentSection===2?"active":""}`}><a className="nav-link" href="#contact"> Contact</a></li>
                   
                    </ul>
                    <div className="navbar-text ml-lg-auto pr-5 hvr-grow">
                        <a role="button" data-toggle="modal" data-target="#loginModal" className="btn btn-color1">
                            <i className="fa fa-sign-in"></i> LOGOUT
                        </a>
                    </div>
                </div>
            </Nav>
        </div>


        </>
      );
    }
}

export default Navbar;



