import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import AdminLogin from './components/Admin/AdminLogin.jsx'
import AdminDashboard from './components/Admin/AdminDashboard.jsx'
import Logselect from './components/Logselect.jsx'
import Adminstudent from './components/Admin/Adminstudent.jsx'
import ViewStudents from './components/Admin/Viewstudents.jsx'
import UpdateStudent from './components/Admin/Editstudent.jsx'
import Adminstaff from './components/Admin/Adminstaff.jsx'
import ExcelReader from './components/Admin/StuImport.jsx'
import Exam from './components/Admin/Exam.jsx'
import Semeseter1 from './components/Admin/Semeseter1.jsx'
const router = createBrowserRouter([
    {path:"/",element:<App/>},
    {path:"/admin/login",element:<AdminLogin/>},
    {path:"admin/dashboard",element:<AdminDashboard/>},
    {path:"admin/students",element:<ViewStudents/>},
    {path:"admin/addstudent",element:<Adminstudent/>},
    {path:"/updatestudent/:hallticket_no",element:<UpdateStudent/>},
    {path:"/admin/staff",element:<Adminstaff/>},
    {path:"/admin/importstudents",element:<ExcelReader/>},
    {path:"/admin/Exam",element:<Exam/>},
    {path:"/admin/Exam/semester1",element:<Semeseter1/>}
])

createRoot(document.getElementById('root')).render(

    <RouterProvider router={router}/>
)
