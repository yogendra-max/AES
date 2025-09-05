import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./admin.css";

const UpdateStudent = () => {
  const { hallticket_no } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",
    interHallticket: "",
    adharNo: "",
    mobileNo: "",
    email: "",
    group: "",
  });

  const [message, setMessage] = useState("");

  // ✅ Fetch student details by hallticket_no
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`http://localhost:3000/viewstudent/${hallticket_no}`);
        if (!res.ok) throw new Error("Failed to fetch student");
        const data = await res.json();

        // ✅ Map DB fields → frontend fields
        const nameParts = data.name ? data.name.split(" ") : ["", ""];
        setFormData({
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "",
          fatherName: data.fathername || "",
          motherName: data.mothername || "",
          dob: data.dob ? data.dob.split("T")[0] : "", // keep yyyy-mm-dd
          gender: data.gender || "",
          interHallticket: data.I_hallticket || "",
          adharNo: data.adhar || "",
          mobileNo: data.mobile || "",
          email: data.email || "",
          group: data.branch || "",
        });
      } catch (err) {
        console.error(err);
        setMessage("❌ Could not load student details");
      }
    };

    fetchStudent();
  }, [hallticket_no]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.interHallticket) {
      setMessage("⚠️ Please enter Inter Hallticket No (required for update)");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/updatestudent/${hallticket_no}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Update failed");

      setMessage("✅ Student updated successfully!");
      setTimeout(() => navigate("/admin/students"), 1200);
    } catch (err) {
      console.error("Error:", err);
      setMessage("❌ Error updating student");
    }
  };

  return (
    <div className="flex">
      <form onSubmit={handleSubmit} className="w-[60%] ml-10">
        <h2 className="font-semibold text-lg mb-4">Update Student Details</h2>

        {/* First & Last Name */}
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col w-full">
            <label>First Name:</label>
            <input
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="px-3 py-2 border rounded"
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Last Name:</label>
            <input
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="px-3 py-2 border rounded"
            />
          </div>
        </div>

        {/* Parents */}
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col w-full">
            <label>Father Name:</label>
            <input
              value={formData.fatherName}
              onChange={(e) => handleChange("fatherName", e.target.value)}
              className="px-3 py-2 border rounded"
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Mother Name:</label>
            <input
              value={formData.motherName}
              onChange={(e) => handleChange("motherName", e.target.value)}
              className="px-3 py-2 border rounded"
            />
          </div>
        </div>

        {/* DOB & Gender */}
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col w-full">
            <label>DOB:</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              className="px-3 py-2 border rounded"
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Gender:</label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="px-3 py-2 border rounded"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Hallticket & Aadhar */}
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col w-full">
            <label>Inter Hallticket No (Required):</label>
            <input
              type="number"
              value={formData.interHallticket}
              onChange={(e) =>
                handleChange("interHallticket", e.target.value.replace(/\D/g, ""))
              }
              className="px-3 py-2 border rounded"
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Adhar No:</label>
            <input
              type="number"
              value={formData.adharNo}
              onChange={(e) =>
                handleChange("adharNo", e.target.value.replace(/\D/g, ""))
              }
              className="px-3 py-2 border rounded"
            />
          </div>
        </div>

        {/* Mobile & Email */}
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col w-full">
            <label>Mobile No:</label>
            <input
              type="number"
              value={formData.mobileNo}
              onChange={(e) =>
                handleChange("mobileNo", e.target.value.replace(/\D/g, ""))
              }
              className="px-3 py-2 border rounded"
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="px-3 py-2 border rounded"
            />
          </div>
        </div>

        {/* Branch */}
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col w-52">
            <label>Branch:</label>
            <select
              value={formData.group}
              onChange={(e) => handleChange("group", e.target.value)}
              className="px-3 py-2 border rounded"
            >
              <option value="">Select Branch</option>
              <option>BCA</option>
              <option>BSC</option>
              <option>BIOTECH</option>
              <option>BSC[DS]</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update Student
        </button>
      </form>

      {/* ✅ Removed side preview bar */}

      {message && (
        <p className="absolute bottom-4 left-[40%] font-semibold">{message}</p>
      )}
    </div>
  );
};

export default UpdateStudent;
