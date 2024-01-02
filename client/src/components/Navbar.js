import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from '../slices/ModeToggle'
import '../App.css'

const Navbar = () => {
  const mode = useSelector(state=>state.mode.mode);
  const dispatch = useDispatch();

  return (
    <div className='Navbar'>
      <div className="container" onClick={()=>dispatch(changeMode())}>
        <div className='icon'>☀️</div>
        <div className='icon'>🌙</div>
        <div
          className='ball'
          style={mode === "light" ? { left: "2px" } : { right: "2px" }}
        />
      </div>
    </div>
  )
}

export default Navbar