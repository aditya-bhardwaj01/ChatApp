import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { changeName } from '../slices/LoginName';
import '../App.css'

const Login = () => {
  const dispatch = useDispatch();

  return (
    <div className='Login'>
      <input className='name-input' id='name-input' type="text" placeholder='Enter your name' />
      <Link className='btn' to='/chat'
        onClick={() => dispatch(changeName(document.getElementById('name-input').value))}>
        Login
      </Link>
    </div>
  )
}

export default Login