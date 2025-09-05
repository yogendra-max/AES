import React from 'react'
import "./Admin.css"
import { Link } from 'react-router-dom'
const AdminLogin = () => {
  return (
    <div className='mainadminlogin'>
        <div id='container' className='w-[30%] h-[70%] absolute rounded-3xl top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <center>

            <h2 className='top-10 left-[50%] translate-x-[-50%] absolute'>Admin Login</h2>
            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%]'>

            <input placeholder="UserID" type="text" className='h-10 w-[80%] input'/><br></br><br></br><br></br>
            <input placeholder="Password" type="password" className='h-10 w-[80%] input'/><br></br><br></br><br></br>
            <Link to={"/admin/dashboard"}>
            <button className='btn btn-primary w-[80%]'>Login</button>
            </Link>
            </div>
            </center>
        </div>
    </div>
  )
}

export default AdminLogin