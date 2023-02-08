import React from 'react';
import { MdFastfood, MdOutlineMap } from "react-icons/md";
import { WiDaySunnyOvercast } from "react-icons/wi";
import { TbMovie } from "react-icons/tb";
import './Nav.css';

class Nav extends React.Component {

  render() {
    return <nav>
      <ul>
        <li onClick={ this.props.onHandleNavClick } data-name="mapShow" data-value={ this.props.mapShow } className={ this.props.mapShow ? "active" : "" }><MdOutlineMap /></li>
        <li onClick={ this.props.onHandleNavClick } data-name="weatherShow" data-value={ this.props.weatherShow } className={ this.props.weatherShow ? "active" : "" }><WiDaySunnyOvercast /></li>
        <li onClick={ this.props.onHandleNavClick } data-name="movieShow" data-value={ this.props.movieShow } className={ this.props.movieShow ? "active" : "" }><TbMovie /></li>
        <li onClick={ this.props.onHandleNavClick } data-name="foodShow" data-value={ this.props.foodShow } className={ this.props.foodShow ? "active" : "" }><MdFastfood /></li>
      </ul>
    </nav>;
  }
}

export default Nav;