import React from 'react';
import { MdOutlineTravelExplore } from "react-icons/md";
import './Header.css';

class Header extends React.Component {

  render() {
    return <header>
      <h1><a href='./' ><MdOutlineTravelExplore /> City Explorer</a></h1>
    </header>
  }

}

export default Header