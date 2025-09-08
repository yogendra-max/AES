import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdminLogin from "./components/Admin/AdminLogin.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import Logselect from "./components/Logselect.jsx";
import Adminstudent from "./components/Admin/Adminstudent.jsx";
import ViewStudents from "./components/Admin/Viewstudents.jsx";
import UpdateStudent from "./components/Admin/Editstudent.jsx";
import Adminstaff from "./components/Admin/Adminstaff.jsx";
import ExcelReader from "./components/Admin/StuImport.jsx";
import Exam from "./components/Admin/Exam.jsx";
import Semeseter1 from "./components/Admin/Semeseter1.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import NotFound from "./components/NotFound.jsx";
import SubjectsMaping from "./components/Admin/SubjectsMaping.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/logselect", element: <Logselect /> },
  { path: "/admin/login", element: <AdminLogin /> },

  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/students",
    element: (
      <ProtectedRoute>
        <ViewStudents />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/addstudent",
    element: (
      <ProtectedRoute>
        <Adminstudent />
      </ProtectedRoute>
    ),
  },
  { path: "/updatestudent/:hallticket_no", element: <UpdateStudent /> },
  {
    path: "/admin/staff",
    element: (
      <ProtectedRoute>
        <Adminstaff />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/importstudents",
    element: (
      <ProtectedRoute>
        <ExcelReader />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/Exam",
    element: (
      <ProtectedRoute>
        <Exam />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/Exam/semester1",
    element: (
      <ProtectedRoute>
        <Semeseter1 />
      </ProtectedRoute>
    ),
  },

  // 404 fallback
  { path: "/404", element: <NotFound /> },
  { path: "*", element: <NotFound /> },
  {path:"/admin/subjects",element:<SubjectsMaping/>}
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
