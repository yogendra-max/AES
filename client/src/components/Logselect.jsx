import React from 'react'
import {Link} from "react-router-dom"
const Logselect = () => {
  return (
    <>
    <Link to ={"/admin/login"}>
    <button>admin</button>
    </Link>
    <br/> <br/>

    <button>Staff</button> <br/> <br/>
    
    <button>student</button><br/> <br/>
    </>
  )
}

export default Logselect