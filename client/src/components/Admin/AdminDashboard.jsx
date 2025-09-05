import React from 'react'
import { Link } from 'react-router-dom'
const AdminDashboard = () => {
  return (
    <div>
        <Link to={"/admin/students"}>
        <button>Student</button><br/><br/>
        </Link>
        <Link to={"/admin/staff"}>
        <button>Staff</button>
        </Link>
        <Link to={"/admin/Exam"}>
        <button>Exam</button>
        </Link>
    </div>
  )
}

export default AdminDashboard