    import React, { useState } from "react";
    import "./admin.css";

    const Adminstudent = () => {
    const [formData, setFormData] = useState({
        firstName: "", lastName: "", fatherName: "", motherName: "",
        dob: "", gender: "", interHallticket: "", adharNo: "",
        mobileNo: "", email: "", group: "",semester: "1", photo: null
    });
    const [photoPreview, setPhotoPreview] = useState(null);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, photo: file });
        if (file) {
        const reader = new FileReader();
        reader.onload = () => setPhotoPreview(reader.result);
        reader.readAsDataURL(file);
        } else setPhotoPreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await fetch("http://localhost:3000/addstudent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        console.log(formData);
        } catch (err) {
        console.error("Error:", err);
        }

        setFormData({
        firstName: "", lastName: "", fatherName: "", motherName: "",
        dob: "", gender: "", interHallticket: "", adharNo: "",
        mobileNo: "", email: "", group: "", hallticketNo: "", semester:"",photo: null
        });
        setPhotoPreview(null);
    };

    return (
        <div className="flex">
        <form onSubmit={handleSubmit} className="w-[60%] ml-10">
            <h2 className="font-semibold text-lg mb-4">Enter New Student Details</h2>

            <div className="flex gap-4 mb-4">
            <div className="flex flex-col w-full">
                <label>First Name:</label>
                <input value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className="px-3 py-2 border rounded" />
            </div>
            <div className="flex flex-col w-full">
                <label>Last Name:</label>
                <input value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className="px-3 py-2 border rounded" />
            </div>
            </div>

            <div className="flex gap-4 mb-4">
            <div className="flex flex-col w-full">
                <label>Father Name:</label>
                <input value={formData.fatherName} onChange={(e) => handleChange("fatherName", e.target.value)} className="px-3 py-2 border rounded" />
            </div>
            <div className="flex flex-col w-full">
                <label>Mother Name:</label>
                <input value={formData.motherName} onChange={(e) => handleChange("motherName", e.target.value)} className="px-3 py-2 border rounded" />
            </div>
            </div>
            <div className="flex gap-4 mb-4">
            <div className="flex flex-col w-full">
                <label>DOB:</label>
                <input type="date" value={formData.dob} onChange={(e) => handleChange("dob", e.target.value)} className="px-3 py-2 border rounded" />
            </div>
            <div className="flex flex-col w-full">
                <label>Gender:</label>
                <select value={formData.gender} onChange={(e) => handleChange("gender", e.target.value)} className="px-3 py-2 border rounded">
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                </select>
            </div>
            </div>

            <div className="flex gap-4 mb-4">
            <div className="flex flex-col w-full">
                <label>Inter Hallticket No:</label>
                <input type="number" value={formData.interHallticket} onChange={(e) => handleChange("interHallticket", e.target.value.replace(/\D/g, ""))} className="px-3 py-2 border rounded" />
            </div>
            <div className="flex flex-col w-full">
                <label>Adhar No:</label>
                <input type="number" value={formData.adharNo} onChange={(e) => handleChange("adharNo", e.target.value.replace(/\D/g, ""))} className="px-3 py-2 border rounded" />
            </div>
            </div>

            <div className="flex gap-4 mb-4">
            <div className="flex flex-col w-full">
                <label>Mobile No:</label>
                <input type="number" value={formData.mobileNo} onChange={(e) => handleChange("mobileNo", e.target.value.replace(/\D/g, ""))} className="px-3 py-2 border rounded" />
            </div>
            <div className="flex flex-col w-full">
                <label>Email:</label>
                <input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className="px-3 py-2 border rounded" />
            </div>
            </div>

            <div className="flex gap-4 mb-4">
            <div className="flex flex-col w-full">
                <label>Branch:</label>
                <select value={formData.group} onChange={(e) => handleChange("group", e.target.value)} className="px-3 py-2 border rounded">
                <option value="" required>Select Branch</option>
                <option>BCA</option>
                <option>BSC</option>
                <option>BIOTECH</option>
                <option>BSC[DS]</option>
                </select>
            </div>
            <div className="flex flex-col w-full">
                <label>Semester:</label>
                <select value={formData.semester} onChange={(e) => handleChange("semester", e.target.value)} className="px-3 py-2 border rounded">
                <option value={1}>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                </select>
            </div>
            <div className="flex flex-col w-full">
                <label>Photo:</label>
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="px-3 py-2 border rounded" />
            </div>
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
        </form>

        {/* Preview */}
        <div className="ml-10 mt-4 w-[30%] border-2 p-2">
        
            {Object.entries(formData).map(([key, value]) =>
            key !== "photo"? (
                <p key={key} className="capitalize"><b>{key.replace(/([A-Z])/g, ' $1')}:</b> {value}</p>
            ) : null
            )}
                <h6>Photo Preview:</h6>
            {photoPreview && <img src={photoPreview} alt="Preview" className="w-32 h-32 object-cover border mt-2" />}
        </div>
        </div>
    );
    };

    export default Adminstudent;
