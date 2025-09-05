import React, { useState } from "react";
import "./Student.css";
// Generic Field component
const Field = ({ label, value, setValue, type = "text", options }) => (
  <div className="flex flex-col mb-4 w-full">
    <span className="text-black text-sm mb-1"><b>{label}</b></span>
    {type === "select" ? (
      <select
        value={value} 
        required
        onChange={(e) => setValue(e.target.value)}
        className="px-3 py-2 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        value={value}
        required
        onChange={(e) => {
          if (type === "number") {
            const val = e.target.value.replace(/\D/g, "");
            setValue(val);
          } else {
            setValue(e.target.value);
          }
        }}
        className="px-3 py-2 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3338A0]"
      />
    )}
  </div>
);

// Two-column layout
const TwoColumnField = ({ field1, field2 }) => (
  <div className="flex flex-col md:flex-row gap-4 mb-4">
    <Field {...field1} />
    <Field {...field2} />
  </div>
);

const StudentFormStyled = () => {
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
    Semester: "",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
const [response, setResponse] = useState(""); // added state for API response

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

    // Required fields validation
    const requiredFields = [
      "firstName",
      "lastName",
      "fatherName",
      "motherName",
      "dob",
      "gender",
      "group",
    ];
    // for (let field of requiredFields) {
    //   if (!formData[field]) {
    //     alert(`Please fill ${field}`);
    //     return;
    //   }
    // }

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
    //   setResponse(`✅ ${result.message}`);
    } catch (err) {
      console.error("Error:", err);
    //   setResponse("❌ Failed to send data");
    }

    console.log(formData);

    // Reset form
    setFormData({
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
      hallticketNo: "",
      photo: null,
    });
    setPhotoPreview(null);
  };

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="w-[60%] ml-10"
    >
      <div className="">
        <h2 className="font-semibold text-lg">Enter New Student Details </h2>
        
      </div>

      {/* Student Name */}
      <TwoColumnField
        field1={{
          label: "First Name :",
          value: formData.firstName,
          setValue: (val) => setFormData({ ...formData, firstName: val }),
        }}
        field2={{
          label: "Last Name :",
          value: formData.lastName,
          setValue: (val) => setFormData({ ...formData, lastName: val }),
        }}
      />

      {/* Father & Mother Name */}
      <TwoColumnField
        field1={{
          label: "Father Name :",
          value: formData.fatherName,
          setValue: (val) => setFormData({ ...formData, fatherName: val }),
        }}
        field2={{
          label: "Mother Name : ", 
          value: formData.motherName,
          setValue: (val) => setFormData({ ...formData, motherName: val }),
        }}
      />

      {/* DOB & Gender */}
      <TwoColumnField
        field1={{
          label: "Date of Birth :",
          value: formData.dob,
          setValue: (val) => setFormData({ ...formData, dob: val }),
          type: "date",
        }}
        field2={{
          label: "Gender : ",
          value: formData.gender,
          setValue: (val) => setFormData({ ...formData, gender: val }),
          type: "select",
          options: ["Male", "Female", "Other"],
        }}
      />

      {/* Hallticket & IDs */}
      <TwoColumnField
        field1={{
          label: "Inter Hallticket No. :",
          value: formData.interHallticket,
          setValue: (val) =>
            setFormData({ ...formData, interHallticket: val }),
          type: "number",
        }}
        field2={{
          label: "Adhar No. :",
          value: formData.adharNo,
          setValue: (val) => setFormData({ ...formData, adharNo: val }),
          type: "number",
        }}
      />
      <TwoColumnField
        field1={{
          label: "Mobile No.:",
          value: formData.mobileNo,
          setValue: (val) => setFormData({ ...formData, mobileNo: val }),
          type: "number",
        }}
        field2={{
          label: "Email :",
          value: formData.email,
          setValue: (val) => setFormData({ ...formData, email: val }),
          type: "email",
        }}
      />
      {/* Group Dropdown */}
      <TwoColumnField
        field1={{
          label: "Branch :",
          value: formData.group,
          setValue: (val) => setFormData({ ...formData, group: val }),
          type: "select",
          options: ["BCA", "BSC", "BIOTECH", "BSC[DS]"],
        }}
        field2={{
          label: "Semester",
          value: formData.Semester,
          setValue: (val) => setFormData({ ...formData, Semester: val }),
          type: "text",
        }}
      />

      {/* Photo Upload */}
      {/* <div className="mb-4">
        <span className="text-black text-sm mb-1 block"><b>Photo</b></span>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="border px-3 py-2 rounded bg-gray-100"
        />
      </div> */}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>

      {/* Response message */}
      {/* {response && <p className="mt-4 text-center">{response}</span>} */}
    </form>
    <article className="absolute top-2 right-80 w-[30%] translate-x-[65%] h-full rounded border-solid border-2 border-gray-400">
        <div className="ml-3 h-screen">

        <h3 className="capitalize">First Name : <span>{formData.firstName}</span></h3>
        <h3 className="capitalize">Last Name : <span>{formData.lastName}</span></h3>
        <h3 className="capitalize">Father Name : <span>{formData.fatherName}</span></h3>
        <h3 className="capitalize">Mother Name : <span>{formData.motherName}</span></h3>
        <h3 className="capitalize">DOB : <span>{formData.dob}</span></h3>
        <h3 className="capitalize">Gender : <span>{formData.gender}</span></h3>
        <h3 className="capitalize">InterHallticketNo. : {formData.interHallticket}<span></span></h3>
        <h3 className="capitalize">Adharno. : <span>{formData.adharNo}</span></h3>
        <h3 className="capitalize">Mobileno. : <span>{formData.mobileNo}</span></h3>
        <h3 className="capitalize">Email : <span>{formData.email}</span></h3>
        <h3 className="capitalize">Branch : <span>{formData.group}</span></h3>
        <div>
            <h3>Photo Preview:</h3>
        {photoPreview && (
            <img
            src={photoPreview}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover border"
/>)}
            </div>
            </div>
    </article>
    </>
  );
};

export default StudentFormStyled;