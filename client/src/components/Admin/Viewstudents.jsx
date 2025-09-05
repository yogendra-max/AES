import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const navigate = useNavigate();

  // Fetch students
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:3000/viewstudents");
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      setStudents(data);
      setFilteredStudents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Delete student
  const handleDelete = async (hallticket_no) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const response = await fetch(
        `http://localhost:3000/deletestudent/${hallticket_no}`,
        { method: "DELETE" }
      );
      const result = await response.json();
      console.log(result.message);
      fetchStudents(); // refresh list
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  // Handle search and filters
  useEffect(() => {
    let filtered = [...students];

    // Search
    if (searchTerm) {
      filtered = filtered.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(student.hallticket_no).includes(searchTerm)
      );
    }

    // Filter by semester
    if (semesterFilter) {
      filtered = filtered.filter(
        (student) => String(student.semester) === semesterFilter
      );
    }

    // Filter by branch
    if (branchFilter) {
      filtered = filtered.filter(
        (student) => student.branch.toLowerCase() === branchFilter.toLowerCase()
      );
    }

    setFilteredStudents(filtered);
  }, [searchTerm, semesterFilter, branchFilter, students]);

  if (loading) return <p>Loading students...</p>;

  // Unique semesters and branches for filter dropdowns
  const semesters = [...new Set(students.map((s) => s.semester))].sort();
  const branches = [...new Set(students.map((s) => s.branch))].sort();

  return (
    <div className="container mx-auto mt-6">
    <div className="sticky top-0 h-48 bg-white p-4">
      <h2 className="text-xl font-bold mb-4">Students List</h2>
      {/* Action buttons */}
      <div className="flex justify-between mb-4">
        <div>
          <button
            onClick={() => navigate("/admin/addstudent")}
            className="bg-orange-500 text-white px-4 py-2 rounded-3xl hover:bg-orange-600 mr-2"
            >
            <b>+</b> Add Student
          </button>
          <button
            onClick={() => navigate("/admin/importstudents")}
            className="bg-gray-200 text-black px-4 py-2 rounded-3xl hover:bg-gray-300"
            >
            <i className="fa fa-download"></i> Import Excel Sheet
          </button>
        </div>

        {/* Search input */}
        <input
          type="text"
          placeholder="Type To search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" mr-[0px] border border-gray-400 px-2 py-1 rounded w-[50%] h-10 bg-gray-300"
          />
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
          className="border border-gray-400 px-2 py-1 rounded"
          >
          <option value="">All Semesters</option>
          {semesters.map((sem) => (
              <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>

        <select
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
          className="border border-gray-400 px-2 py-1 rounded"
          >
          <option value="">All Branches</option>
          {branches.map((br) => (
              <option key={br} value={br}>
              {br}
            </option>
          ))}
        </select>
        </div>

          </div>
      {/* Students table */}
      <table className="table-dark min-w-full border border-black bg-gray-200 text-black">
        <thead className="bg-black text-white sticky top-44">
          <tr className="">
            <th className="px-4 py-2">Hallticket No</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Semester</th>
            <th className="px-4 py-2">Branch</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No students found
              </td>
            </tr>
          ) : (
            filteredStudents.map((student) => (
              <tr key={student.hallticket_no} className="text-center border-t">
                <td className="px-4 py-2">{student.hallticket_no}</td>
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.semester}</td>
                <td className="px-4 py-2">{student.branch}</td>
                <td className="px-4 py-2">{student.email}</td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="bg-green-500 px-2 py-1 rounded text-white hover:bg-green-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/updatestudent/${student.hallticket_no}`)
                    }
                    className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(student.hallticket_no)}
                    className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Popup Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Student Details</h3>
            <p>
              <strong>Hallticket No:</strong> {selectedStudent.hallticket_no}
            </p>
            <p>
              <strong>Name:</strong> {selectedStudent.name}
            </p>
            <p>
              <strong>Age:</strong> {selectedStudent.age}
            </p>
            <p>
              <strong>Branch:</strong> {selectedStudent.branch}
            </p>
            <p>
              <strong>Email:</strong> {selectedStudent.email}
            </p>
            <p>
              <strong>MotherName:</strong> {selectedStudent.mothername}
            </p>
            <p>
              <strong>FatherName:</strong> {selectedStudent.fathername}
            </p>
            <p>
              <strong>Gender:</strong> {selectedStudent.gender}
            </p>
            <p>
              <strong>Mobile:</strong> {selectedStudent.mobile}
            </p>
            <p>
              <strong>InterHallticketNo:</strong> {selectedStudent.I_hallticket}
            </p>
            <p>
              <strong>Semester:</strong> {selectedStudent.semester}
            </p>
            <p>
<strong>Semester:</strong> {new Date(selectedStudent.dob).toISOString().split("T")[0]}            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStudents;
